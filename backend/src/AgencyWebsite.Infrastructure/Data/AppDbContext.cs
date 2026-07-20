using AgencyWebsite.Application.Common.Interfaces;
using AgencyWebsite.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Infrastructure.Data;

public class AppDbContext : DbContext, IAppDbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Service> Services => Set<Service>();
    public DbSet<Portfolio> Portfolios => Set<Portfolio>();
    public DbSet<CaseStudy> CaseStudies => Set<CaseStudy>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<Testimonial> Testimonials => Set<Testimonial>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();
    public DbSet<JobListing> JobListings => Set<JobListing>();
    public DbSet<Admin> Admins => Set<Admin>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        modelBuilder.Entity<Admin>().HasIndex(a => a.Email).IsUnique();
        modelBuilder.Entity<AuditLog>().HasIndex(a => a.Timestamp);
        modelBuilder.Entity<AuditLog>().HasIndex(a => a.UserId);
    }
}
