# Discoveer CMS

## Project Description

Discoveer is a decentralized content management system (CMS), built using Sui and Walrus. It relies on no centralized element as the frontend is hosted on Walrus Sites and there's no backend, just Sui smart contracts.

## Features

- Decentralized content management powered by Sui blockchain and Walrus.
- Content stored as blobs on Walrus.
- Permissions and workflows managed by Sui blockchain.
- Markdown-based content editing with a preview mode.
- Connect wallet functionality using @mysten/dapp-kit.
- View and create content pages.
- Basic article listing (currently with mock data).
- Responsive header with navigation and connect wallet/account display.
- Interactive circle illustration on the landing page.

## Technologies Used

- Next.js (React Framework)
- TypeScript
- Tailwind CSS (for styling)
- Sui Blockchain (via @mysten/dapp-kit and Sui.js)
- Walrus Storage (via custom client and hook)
- Lucide React (for icons)
- shadcn/ui (for UI components like Button, Tabs, Textarea, Input, Card, Label, DropdownMenu)
- react-markdown (for rendering markdown - although a simple custom converter is currently used in the editor preview)
- sonner (for toasts/notifications)

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/SeventhOdyssey71/decentralized-cms-discoveer.git
    cd decentralized-cms-discoveer
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or using yarn:
    # yarn install
    # or using pnpm:
    # pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following:

    ```env
    NEXT_PUBLIC_WALRUS_API_URL=https://api.walrus.storage
    # If you have a Walrus API key, add it here (for backend/server-side use)
    # WALRUS_API_KEY=your_walrus_api_key

    # Sui RPC URL (choose one of the networks)
    NEXT_PUBLIC_SUI_RPC_URL=https://fullnode.testnet.sui.io

    # Sui Contract Package ID and Object IDs (These need to be obtained after deploying your Sui contract)
    NEXT_PUBLIC_CONTRACT_PACKAGE_ID=YOUR_PACKAGE_ID
    NEXT_PUBLIC_AUTHORIZED_AUTHORS_OBJECT_ID=YOUR_AUTHORIZED_AUTHORS_OBJECT_ID
    NEXT_PUBLIC_ARTICLES_OBJECT_ID=YOUR_ARTICLES_OBJECT_ID
    NEXT_PUBLIC_ARTICLE_LIKE_COUNTERS_OBJECT_ID=YOUR_ARTICLE_LIKE_COUNTERS_OBJECT_ID
    ```

4.  **Deploy the Sui Contract:**

    Navigate to the `sui_contracts` directory and publish your Move contract to the Sui network (localnet, devnet, testnet, or mainnet). Note down the package ID and shared object IDs (`authorized_authors`, `articles`, `article_like_counters`) and update your `.env.local` file.

    ```bash
    cd sui_contracts
    sui client publish --gas-budget 10000000
    ```

5.  **Run the Walrus Site Builder:**

    Ensure you have the Walrus site builder CLI installed and configured. You will need it for local Walrus storage interaction and eventually for deployment to Walrus Sites.

    ```bash
    # Example command (refer to Walrus documentation for specifics)
    # walrus-site-builder init
    # walrus-site-builder serve
    ```

## How to Run the Project

Run the Next.js development server:

```bash
npm run dev
# or using yarn:
# yarn dev
# or using pnpm:
# pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── app/
│   ├── api/             # API routes (if any)
│   ├── [article]/       # Dynamic route for articles
│   ├── connect-wallet/  # Connect wallet page
│   ├── create/          # Create article page
│   ├── dashboard/       # Dashboard page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Landing page
│   └── globals.css      # Global styles
├── components/        # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   ├── circle-illustration.tsx # Landing page orbiting illustration
│   ├── header.tsx       # Site header
│   └── markdown-editor.tsx # Markdown editor component
├── hooks/             # Custom React hooks
│   ├── useContract.ts   # Hook for Sui contract interactions
│   └── useWalrus.ts     # Hook for Walrus interactions
├── lib/
│   ├── contracts/       # Sui contract configuration
│   └── walrus/          # Walrus client and configuration
├── public/            # Static assets (images, fonts, favicon)
│   └── ...
├── sui_contracts/     # Sui Move smart contracts
│   └── sources/
├── .env.local.example
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── ...
```

## Deployment

This project is designed to be deployed to Walrus Sites, leveraging its decentralized hosting capabilities. Refer to the Walrus documentation for specific instructions on deploying Next.js applications.

## Contributing

Contributions are welcome! Please follow the standard GitHub flow: Fork the repository, create a new branch, make your changes, and open a pull request.

## License

[Specify your project's license here, e.g., MIT License]
