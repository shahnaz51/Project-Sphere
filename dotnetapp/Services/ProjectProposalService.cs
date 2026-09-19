using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class ProjectProposalService
    {
        private readonly ApplicationDbContext _context;

        public ProjectProposalService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProjectProposal>>
            GetAllProjectProposals()
        {
            return await _context.ProjectProposals
                .Include(x => x.User)
                .ToListAsync();
        }

        public async Task<ProjectProposal>
            GetProjectProposalById(int proposalId)
        {
            return await _context.ProjectProposals
                .Include(x => x.User)
                .FirstOrDefaultAsync(x =>
                    x.ProposalId == proposalId);
        }

        public async Task<IEnumerable<ProjectProposal>>
            GetProjectProposalsByUserId(int userId)
        {
            return await _context.ProjectProposals
                .Include(x => x.User)
                .Where(x => x.UserId == userId)
                .ToListAsync();
        }

        public async Task AddProjectProposal(
            ProjectProposal projectProposal)
        {
            await _context.ProjectProposals
                .AddAsync(projectProposal);

            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateProjectProposal(
            int proposalId,
            ProjectProposal projectProposal)
        {
            var existing =
                await _context.ProjectProposals
                .FirstOrDefaultAsync(x =>
                    x.ProposalId == proposalId);

            if (existing == null)
                return false;

            existing.ProposalTitle =
                projectProposal.ProposalTitle;

            existing.ProposalDescription =
                projectProposal.ProposalDescription;

            existing.Status =
                projectProposal.Status;

            existing.UserId =
                projectProposal.UserId;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteProjectProposal(
            int proposalId)
        {
            var proposal =
                await _context.ProjectProposals
                .FirstOrDefaultAsync(x =>
                    x.ProposalId == proposalId);

            if (proposal == null)
                return false;

            _context.ProjectProposals.Remove(proposal);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}