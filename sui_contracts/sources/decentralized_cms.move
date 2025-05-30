/// A decentralized CMS smart contract.
module decentralized_cms::decentralized_cms {
    use sui::coin::{Self, Coin};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::table::{Self, Table};
    use sui::object::{Self, UID};

    /// Error codes
    const EInsufficientPayment: u64 = 0;
    const EAlreadyAuthor: u64 = 1;
    const EArticleNotFound: u64 = 2;
    const EInsufficientPermission: u64 = 3;

    /// Struct to represent the capability granted to an author.
    struct AuthorCapability has key, store {
        id: UID,
    }

    /// Struct to represent an article on-chain.
    struct Article has key, store {
        id: UID,
        author: address,
        walrus_blob_id: vector<u8>, // Placeholder for Walrus blob ID
        // We won't store full content on-chain
    }

    /// A shared object to store articles.
    struct Articles has key {
        id: UID,
        articles: Table<u64, Article>,
        next_article_id: u64, // Counter for unique article IDs
    }

    /// A shared object to store authorized authors.
    /// Maps author address to AuthorCapability.
    struct AuthorizedAuthors has key {
        id: UID,
        authors: Table<address, AuthorCapability>,
    }

    /// A shared object to store article like counters.
    /// Maps article ID (u64 for now, linked to Walrus blob later) to like count.
    struct ArticleLikeCounters has key {
        id: UID,
        counters: Table<u64, u64>,
    }

    /// The treasury address where author access fees are sent.
    const AUTHOR_TREASURY: address = @0x0;

    /// The treasury address where article like fees are sent.
    const LIKE_TREASURY: address = @0x0; // Can be the same or different from AUTHOR_TREASURY

    /// Initialize the shared objects.
    fun init(ctx: &mut TxContext) {
        let authorized_authors = AuthorizedAuthors {
            id: object::new(ctx),
            authors: table::new(ctx),
        };
        transfer::share_object(authorized_authors);

        let article_like_counters = ArticleLikeCounters {
            id: object::new(ctx),
            counters: table::new(ctx),
        };
        transfer::share_object(article_like_counters);

        let articles_obj = Articles {
            id: object::new(ctx),
            articles: table::new(ctx),
            next_article_id: 0,
        };
        transfer::share_object(articles_obj);
    }

    /// Grant author access to a user upon payment.
    /// Requires 1 SUI payment.
    public entry fun grant_author_access(
        authorized_authors: &mut AuthorizedAuthors,
        payment: Coin<0x2::sui::SUI>,
        ctx: &mut TxContext,
    ) {
        let required_amount: u64 = 1_000_000_000; // 1 SUI
        let actual_amount = coin::value(&payment);
        assert!(actual_amount >= required_amount, EInsufficientPayment);

        let sender = tx_context::sender(ctx);
        assert!(!table::contains(&authorized_authors.authors, sender), EAlreadyAuthor);

        // Transfer payment to treasury
        transfer::public_transfer(payment, AUTHOR_TREASURY);

        // Grant author capability
        let author_cap = AuthorCapability { id: object::new(ctx) };
        table::add(&mut authorized_authors.authors, sender, author_cap);
    }

    /// Create a new article (only for authorized authors).
    public entry fun create_article(
        authorized_authors: &AuthorizedAuthors,
        articles_obj: &mut Articles,
        walrus_blob_id: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let sender = tx_context::sender(ctx);
        assert!(table::contains(&authorized_authors.authors, sender), EInsufficientPayment); // Using existing error code

        let article_id = articles_obj.next_article_id;
        articles_obj.next_article_id = articles_obj.next_article_id + 1;

        let new_article = Article {
            id: object::new(ctx),
            author: sender,
            walrus_blob_id: walrus_blob_id,
        };

        table::add(&mut articles_obj.articles, article_id, new_article);
    }

    /// Update an article's Walrus blob ID (only for authorized authors).
    public entry fun update_article(
        authorized_authors: &AuthorizedAuthors,
        articles_obj: &mut Articles,
        article_id: u64,
        new_walrus_blob_id: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let sender = tx_context::sender(ctx);
        assert!(table::contains(&authorized_authors.authors, sender), EInsufficientPayment); // Using existing error code for simplicity, could add a new one

        // Ensure the article exists and sender is the author
        assert!(table::contains(&articles_obj.articles, article_id), EArticleNotFound);
        let article = table::borrow_mut(&mut articles_obj.articles, article_id);
        assert!(article.author == sender, EInsufficientPermission);

        // Update the blob ID
        article.walrus_blob_id = new_walrus_blob_id;
    }

    /// Check if a user is an authorized author.
    public fun is_author(
        authorized_authors: &AuthorizedAuthors,
        addr: address,
    ): bool {
        table::contains(&authorized_authors.authors, addr)
    }

    // TODO: Implement like_article function
    public entry fun like_article(
        article_like_counters: &mut ArticleLikeCounters,
        article_id: u64,
        payment: Coin<0x2::sui::SUI>,
        ctx: &mut TxContext,
    ) {
        let required_amount: u64 = 200_000_000; // 0.2 SUI
        let actual_amount = coin::value(&payment);
        assert!(actual_amount >= required_amount, EInsufficientPayment);

        // Transfer payment to treasury
        transfer::public_transfer(payment, LIKE_TREASURY);

        // Increment or create like counter for the article
        if (table::contains(&article_like_counters.counters, article_id)) {
            let counter = table::borrow_mut(&mut article_like_counters.counters, article_id);
            *counter = *counter + 1;
        } else {
            table::add(&mut article_like_counters.counters, article_id, 1);
        }
    }

    /// Get the like count for an article.
    public fun get_like_count(
        article_like_counters: &ArticleLikeCounters,
        article_id: u64,
    ): u64 {
        if (table::contains(&article_like_counters.counters, article_id)) {
            *table::borrow(&article_like_counters.counters, article_id)
        } else {
            0 // Return 0 if article ID not found
        }
    }
} 