# Deploying to Vercel

This project is configured as a Single Page Application (SPA) using React Router and Vite.

## Prerequisites

- [Vercel CLI](https://vercel.com/docs/cli) installed (`npm i -g vercel`) or a Vercel account connected to GitHub.

## Deployment Steps

### Option 1: Using Vercel CLI

1.  Run the deploy command:
    ```bash
    vercel
    ```
2.  Follow the prompts:
    -   **Set up and deploy?** [Y]
    -   **Which scope?** [Select your scope]
    -   **Link to existing project?** [N]
    -   **Project Name:** [ai-resume-analyzer]
    -   **In which directory is your code located?** [./]
    -   **Want to modify these settings?** [Y] (IMPORTANT)
    -   **Build Command:** `npm run build`
    -   **Output Directory:** `build/client`
    -   **Install Command:** `npm install` (default)

3.  Wait for the deployment to complete.

### Option 2: Using GitHub Integration

1.  Push your code to a GitHub repository.
2.  Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** > **Project**.
3.  Import your repository.
4.  In the **Configure Project** section:
    -   **Framework Preset:** Vite
    -   **Build and Output Settings:**
        -   **Build Command:** `npm run build`
        -   **Output Directory:** `build/client`
5.  Click **Deploy**.

## Configuration

A `vercel.json` file is included to handle SPA routing (rewrites all requests to `index.html`).
