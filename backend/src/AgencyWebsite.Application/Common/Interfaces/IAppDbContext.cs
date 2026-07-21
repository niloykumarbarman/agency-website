using AgencyWebsite.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgencyWebsite.Application.Common.Interfaces;

public interface IAppDbContext
{
    DbSet<Service> Services { get; }
    DbSet<Portfolio> Portfolios { get; }
    DbSet<CaseStudy> CaseStudies { get; }
    DbSet<BlogPost> BlogPosts { get; }
    DbSet<Testimonial> Testimonials { get; }
    DbSet<ContactMessage> ContactMessages { get; }
    DbSet<JobListing> JobListings { get; }
    DbSet<Admin> Admins { get; }
    DbSet<AuditLog> AuditLogs { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    DbSet<ConsultationRequest> ConsultationRequests { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
