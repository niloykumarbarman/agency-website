using Devliora.Domain.Entities;
using Devliora.Domain.Enums;

namespace Devliora.Infrastructure.Data;

/// <summary>
/// Idempotent startup seeder. Safe to run on every application start:
/// it only inserts data when the relevant table is empty, so it will
/// never duplicate rows and will self-heal if data is ever lost
/// (e.g. accidental volume wipe) without requiring a manual script.
/// </summary>
public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context, CancellationToken cancellationToken = default)
    {
        await SeedTechnologiesAsync(context, cancellationToken);
    }

    private static async Task SeedTechnologiesAsync(AppDbContext context, CancellationToken cancellationToken)
    {
        if (context.TechnologyItems.Any())
        {
            return;
        }

        var technologies = new List<TechnologyItem>
        {
            Tech("aspnetcore", "ASP.NET Core", TechnologyCategory.BackendApis, 1),
            Tech("nodejs", "Node.js", TechnologyCategory.BackendApis, 2),
            Tech("csharp", "C#", TechnologyCategory.BackendApis, 3),
            Tech("mediatr", "MediatR", TechnologyCategory.BackendApis, 4),
            Tech("fluentvalidation", "FluentValidation", TechnologyCategory.BackendApis, 5),
            Tech("graphql", "GraphQL", TechnologyCategory.BackendApis, 6),

            Tech("nextjs", "Next.js", TechnologyCategory.FrontendUi, 1),
            Tech("react", "React", TechnologyCategory.FrontendUi, 2),
            Tech("typescript", "TypeScript", TechnologyCategory.FrontendUi, 3),
            Tech("tailwindcss", "Tailwind CSS", TechnologyCategory.FrontendUi, 4),
            Tech("framermotion", "Framer Motion", TechnologyCategory.FrontendUi, 5),
            Tech("vuejs", "Vue.js", TechnologyCategory.FrontendUi, 6),

            Tech("docker", "Docker", TechnologyCategory.CloudInfrastructure, 1),
            Tech("kubernetes", "Kubernetes", TechnologyCategory.CloudInfrastructure, 2),
            Tech("terraform", "Terraform", TechnologyCategory.CloudInfrastructure, 3),
            Tech("cloudflare", "Cloudflare", TechnologyCategory.CloudInfrastructure, 4),
            Tech("aws", "AWS", TechnologyCategory.CloudInfrastructure, 5),
            Tech("nginx", "NGINX", TechnologyCategory.CloudInfrastructure, 6),
            Tech("letsencrypt", "Let's Encrypt", TechnologyCategory.CloudInfrastructure, 7),

            Tech("postgresql", "PostgreSQL", TechnologyCategory.DatabasesCaching, 1),
            Tech("redis", "Redis", TechnologyCategory.DatabasesCaching, 2),
            Tech("mongodb", "MongoDB", TechnologyCategory.DatabasesCaching, 3),
            Tech("elasticsearch", "Elasticsearch", TechnologyCategory.DatabasesCaching, 4),
            Tech("kafka", "Apache Kafka", TechnologyCategory.DatabasesCaching, 5),

            Tech("githubactions", "GitHub Actions", TechnologyCategory.DevOpsCicd, 1),
            Tech("github", "GitHub", TechnologyCategory.DevOpsCicd, 2),
            Tech("golang", "Go", TechnologyCategory.DevOpsCicd, 3),
            Tech("rust", "Rust", TechnologyCategory.DevOpsCicd, 4),

            Tech("python", "Python", TechnologyCategory.AiMlData, 1),
            Tech("tensorflow", "TensorFlow", TechnologyCategory.AiMlData, 2),
            Tech("pytorch", "PyTorch", TechnologyCategory.AiMlData, 3),
            Tech("langchain", "LangChain", TechnologyCategory.AiMlData, 4),
            Tech("ollama", "Ollama", TechnologyCategory.AiMlData, 5),
        };

        context.TechnologyItems.AddRange(technologies);
        await context.SaveChangesAsync(cancellationToken);
    }

    private static TechnologyItem Tech(string name, string displayName, TechnologyCategory category, int displayOrder)
        => new()
        {
            Name = name,
            DisplayName = displayName,
            Category = category,
            DisplayOrder = displayOrder,
            IsActive = true
        };
}
