import { NextResponse } from 'next/server';

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const username = "721abhay";

    if (!token) {
        // Return mock data if token is missing (for build/dev safety) but user should really add it
        // Or return 500 to signal setup is needed. 
        // Given the user wants "no fake", returning an error is better so they know to fix it,
        // but to prevent the app from crashing visually, we might handle it on the client.
        return NextResponse.json({ error: "GITHUB_TOKEN is missing in environment variables" }, { status: 500 });
    }

    const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
        repositories(first: 100, isFork: false, ownerAffiliations: OWNER, privacy: PUBLIC) {
          totalCount
          nodes {
            stargazerCount
          }
        }
        followers {
          totalCount
        }

      }
    }
  `;

    try {
        const response = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        const data = await response.json();

        if (data.errors) {
            console.error("GitHub GraphQL Error:", data.errors);
            return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
        }

        return NextResponse.json(data.data.user);
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
