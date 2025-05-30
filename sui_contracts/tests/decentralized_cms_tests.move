// sui_contracts/tests/decentralized_cms_tests.move
#[test_only]
module decentralized_cms::decentralized_cms_tests {
    use sui::test_scenario::{Self as test, Scenario};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::object::id;

    use decentralized_cms::decentralized_cms::{Self, AuthorizedAuthors, ArticleLikeCounters, Articles};

    const ADMIN_ADDRESS: address = @0xA1;
    const USER1_ADDRESS: address = @0xA2;
    const USER2_ADDRESS: address = @0xA3;

    /// Helper to get the shared object IDs after initialization.
    fun get_shared_object_ids(scenario: &mut Scenario): (address, address, address) {
        let admin_authors_id = test::object_id(scenario, @0xDE5EC0DE, AuthorizedAuthors);
        let like_counters_id = test::object_id(scenario, @0xDE5EC0DE, ArticleLikeCounters);
        let articles_id = test::object_id(scenario, @0xDE5EC0DE, Articles);
        (admin_authors_id, like_counters_id, articles_id)
    }

    #[test]
    /// Test initialization and granting author access.
    fun test_grant_author_access() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (authorized_authors_id, _, _) = get_shared_object_ids(&mut scenario);

        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let mut payment = coin::mint_for_testing<SUI>(1_000_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 1 SUI

        // Grant author access
        decentralized_cms::grant_author_access(
            authorized_authors,
            payment,
            &mut test::new_tx_context(&mut scenario, USER1_ADDRESS),
        );

        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        // Assert that USER1 is now an author
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let is_author = decentralized_cms::is_author(authorized_authors, USER1_ADDRESS);
        assert!(is_author, 0);
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        test::end(scenario);
    }

    #[test]
    /// Test liking an article.
    fun test_like_article() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (_, article_like_counters_id, _) = get_shared_object_ids(&mut scenario);

        test::next_tx(&mut scenario, USER1_ADDRESS);
        let article_like_counters = test::shared_object::<ArticleLikeCounters>(&mut scenario, article_like_counters_id);
        let mut payment1 = coin::mint_for_testing<SUI>(200_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 0.2 SUI

        // Like article 1
        decentralized_cms::like_article(
            article_like_counters,
            1, // article_id
            payment1,
            &mut test::new_tx_context(&mut scenario, USER1_ADDRESS),
        );

        test::return_shared<ArticleLikeCounters>(scenario, article_like_counters);

        // Check like count for article 1
        test::next_tx(&mut scenario, USER2_ADDRESS); // Use a different user to read shared object
        let article_like_counters = test::shared_object::<ArticleLikeCounters>(&mut scenario, article_like_counters_id);
        let like_count = decentralized_cms::get_like_count(article_like_counters, 1);
        assert!(like_count == 1, 0);
        test::return_shared<ArticleLikeCounters>(scenario, article_like_counters);

        // Like article 1 again from USER1
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let article_like_counters = test::shared_object::<ArticleLikeCounters>(&mut scenario, article_like_counters_id);
        let mut payment2 = coin::mint_for_testing<SUI>(200_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 0.2 SUI
        decentralized_cms::like_article(
            article_like_counters,
            1, // article_id
            payment2,
            &mut test::new_tx_context(&mut scenario, USER1_ADDRESS),
        );
        test::return_shared<ArticleLikeCounters>(scenario, article_like_counters);

        // Check like count for article 1 again
        test::next_tx(&mut scenario, USER2_ADDRESS); // Use a different user to read shared object
        let article_like_counters = test::shared_object::<ArticleLikeCounters>(&mut scenario, article_like_counters_id);
        let like_count = decentralized_cms::get_like_count(article_like_counters, 1);
        assert!(like_count == 2, 0);
        test::return_shared<ArticleLikeCounters>(scenario, article_like_counters);

        // Like article 2 from USER1
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let article_like_counters = test::shared_object::<ArticleLikeCounters>(&mut scenario, article_like_counters_id);
        let mut payment3 = coin::mint_for_testing<SUI>(200_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 0.2 SUI
        decentralized_cms::like_article(
            article_like_counters,
            2, // article_id
            payment3,
            &mut test::new_tx_context(&mut scenario, USER1_ADDRESS),
        );
        test::return_shared<ArticleLikeCounters>(scenario, article_like_counters);

        // Check like count for article 2
        test::next_tx(&mut scenario, USER2_ADDRESS); // Use a different user to read shared object
        let article_like_counters = test::shared_object::<ArticleLikeCounters>(&mut scenario, article_like_counters_id);
        let like_count_article2 = decentralized_cms::get_like_count(article_like_counters, 2);
        assert!(like_count_article2 == 1, 0);
        test::return_shared<ArticleLikeCounters>(scenario, article_like_counters);

        test::end(scenario);
    }

    #[test]
    /// Test creating and updating an article.
    fun test_create_and_update_article() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (authorized_authors_id, _, articles_id) = get_shared_object_ids(&mut scenario);

        // Grant author access to USER1
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let mut payment = coin::mint_for_testing<SUI>(1_000_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 1 SUI
        decentralized_cms::grant_author_access(authorized_authors, payment, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        // USER1 creates an article
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        let initial_blob_id = b"initial_blob";
        decentralized_cms::create_article(authorized_authors, articles_obj, initial_blob_id, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);
        test::return_shared<Articles>(scenario, articles_obj);

        // Assert that the article was created with the correct initial state
        test::next_tx(&mut scenario, USER2_ADDRESS); // Use a different user to read shared object
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        assert!(table::contains(&articles_obj.articles, 0), 0);
        let article = table::borrow(&articles_obj.articles, 0);
        assert!(article.author == USER1_ADDRESS, 0);
        assert!(article.walrus_blob_id == initial_blob_id, 0);
        test::return_shared<Articles>(scenario, articles_obj);

        // USER1 updates the article
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        let updated_blob_id = b"updated_blob";
        let article_id_to_update = 0; // Assuming the first article created has ID 0
        decentralized_cms::update_article(authorized_authors, articles_obj, article_id_to_update, updated_blob_id, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);
        test::return_shared<Articles>(scenario, articles_obj);

        // Assert that the article was updated with the new blob ID
        test::next_tx(&mut scenario, USER2_ADDRESS); // Use a different user to read shared object
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        assert!(table::contains(&articles_obj.articles, 0), 0);
        let article = table::borrow(&articles_obj.articles, 0);
        assert!(article.walrus_blob_id == updated_blob_id, 0);
        test::return_shared<Articles>(scenario, articles_obj);

        test::end(scenario);
    }

    #[test]
    /// Test insufficient payment for author access.
    #[expected_failure(abort_code = decentralized_cms::decentralized_cms::EInsufficientPayment)]
    fun test_insufficient_author_payment() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (authorized_authors_id, _, _) = get_shared_object_ids(&mut scenario);

        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let mut payment = coin::mint_for_testing<SUI>(500_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 0.5 SUI (insufficient)

        // Attempt to grant author access with insufficient payment
        decentralized_cms::grant_author_access(
            authorized_authors,
            payment,
            &mut test::new_tx_context(&mut scenario, USER1_ADDRESS),
        );

        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        test::end(scenario);
    }

    #[test]
    /// Test insufficient payment for liking an article.
    #[expected_failure(abort_code = decentralized_cms::decentralized_cms::EInsufficientPayment)]
    fun test_insufficient_like_payment() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (_, article_like_counters_id, _) = get_shared_object_ids(&mut scenario);

        test::next_tx(&mut scenario, USER1_ADDRESS);
        let article_like_counters = test::shared_object::<ArticleLikeCounters>(&mut scenario, article_like_counters_id);
        let mut payment = coin::mint_for_testing<SUI>(100_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 0.1 SUI (insufficient)

        // Attempt to like an article with insufficient payment
        decentralized_cms::like_article(
            article_like_counters,
            1, // article_id
            payment,
            &mut test::new_tx_context(&mut scenario, USER1_ADDRESS),
        );

        test::return_shared<ArticleLikeCounters>(scenario, article_like_counters);

        test::end(scenario);
    }

    #[test]
    /// Test non-author attempting to create an article.
    #[expected_failure(abort_code = decentralized_cms::decentralized_cms::EInsufficientPayment)]
    fun test_non_author_create_article() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (authorized_authors_id, _, articles_id) = get_shared_object_ids(&mut scenario);

        // USER1 is not an author, attempts to create an article
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        let blob_id = b"some_blob";
        decentralized_cms::create_article(authorized_authors, articles_obj, blob_id, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);
        test::return_shared<Articles>(scenario, articles_obj);

        test::end(scenario);
    }

    #[test]
    /// Test non-author attempting to update an article.
    #[expected_failure(abort_code = decentralized_cms::decentralized_cms::EInsufficientPermission)]
    fun test_non_author_update_article() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (authorized_authors_id, _, articles_id) = get_shared_object_ids(&mut scenario);

        // Grant author access to USER1 so there is an article to potentially update
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let mut payment = coin::mint_for_testing<SUI>(1_000_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 1 SUI
        decentralized_cms::grant_author_access(authorized_authors, payment, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        // USER1 creates an article
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        let initial_blob_id = b"initial_blob";
        decentralized_cms::create_article(authorized_authors, articles_obj, initial_blob_id, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);
        test::return_shared<Articles>(scenario, articles_obj);

        // USER2 is not an author, attempts to update the article
        test::next_tx(&mut scenario, USER2_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        let updated_blob_id = b"updated_blob";
        let article_id_to_update = 0; // Assuming the first article created has ID 0
        decentralized_cms::update_article(authorized_authors, articles_obj, article_id_to_update, updated_blob_id, &mut test::new_tx_context(&mut scenario, USER2_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);
        test::return_shared<Articles>(scenario, articles_obj);

        test::end(scenario);
    }

    #[test]
    /// Test attempting to become an author when already an author.
    #[expected_failure(abort_code = decentralized_cms::decentralized_cms::EAlreadyAuthor)]
    fun test_already_author() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (authorized_authors_id, _, _) = get_shared_object_ids(&mut scenario);

        // Grant author access to USER1 first time
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let mut payment1 = coin::mint_for_testing<SUI>(1_000_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 1 SUI
        decentralized_cms::grant_author_access(authorized_authors, payment1, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        // USER1 attempts to get author access again
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let mut payment2 = coin::mint_for_testing<SUI>(1_000_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 1 SUI
        decentralized_cms::grant_author_access(authorized_authors, payment2, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));

        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        test::end(scenario);
    }

    #[test]
    /// Test attempting to update a non-existent article.
    #[expected_failure(abort_code = decentralized_cms::decentralized_cms::EArticleNotFound)]
    fun test_update_non_existent_article() {
        let scenario = test::begin(ADMIN_ADDRESS);
        let ctx = test::new_tx_context(&mut scenario, ADMIN_ADDRESS);

        // Initialize the module
        decentralized_cms::init(&mut ctx);

        let (authorized_authors_id, _, articles_id) = get_shared_object_ids(&mut scenario);

        // Grant author access to USER1 (needed for update_article function signature)
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let mut payment = coin::mint_for_testing<SUI>(1_000_000_000, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS)); // 1 SUI
        decentralized_cms::grant_author_access(authorized_authors, payment, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));
        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);

        // USER1 attempts to update a non-existent article (ID 99)
        test::next_tx(&mut scenario, USER1_ADDRESS);
        let authorized_authors = test::shared_object::<AuthorizedAuthors>(&mut scenario, authorized_authors_id);
        let articles_obj = test::shared_object::<Articles>(&mut scenario, articles_id);
        let updated_blob_id = b"updated_blob";
        let non_existent_article_id = 99;
        decentralized_cms::update_article(authorized_authors, articles_obj, non_existent_article_id, updated_blob_id, &mut test::new_tx_context(&mut scenario, USER1_ADDRESS));

        test::return_shared<AuthorizedAuthors>(scenario, authorized_authors);
        test::return_shared<Articles>(scenario, articles_obj);

        test::end(scenario);
    }

    // TODO: Add tests for insufficient payments, non-authors attempting actions, etc.
} 