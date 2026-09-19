using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Services
{
    public class FeedbackService
    {
        private readonly ApplicationDbContext _context;

        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<object>>
            GetAllFeedbacks()
        {
            // return await _context.Feedbacks
            //     .Include(x => x.User)
            //     .ToListAsync();
                    var feedbacks = await _context.Feedbacks
                    .Select(f => new
                    {
                        f.FeedbackId,
                        f.UserId,
                        f.FeedbackText,
                        f.Date,

                        User = new
                        {
                            f.User.Username,
                            f.User.Email,
                            f.User.MobileNumber,
                            f.User.UserRole
                        }
                    })
                    .ToListAsync();
                    return feedbacks;
        }

        public async Task<IEnumerable<object>>
            GetFeedbacksByUserId(int userId)
            {
                // return await _context.Feedbacks
                // .Include(x => x.User)
                // .Where(f => f.UserId == userId)
                // .ToListAsync();
                var feedbacks = await _context.Feedbacks
                    .Where(f => f.UserId == userId)
                    .Select(f => new
                    {
                        f.FeedbackId,
                        f.UserId,
                        f.FeedbackText,
                        f.Date,

                        User = new
                        {
                            f.User.Username,
                            f.User.Email,
                            f.User.MobileNumber,
                            f.User.UserRole
                        }
                    })
                    .ToListAsync();
                    return feedbacks;

            }

        public async Task<bool> AddFeedback(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var feedback = await _context.Feedbacks
                .FirstOrDefaultAsync(x =>
                    x.FeedbackId == feedbackId);

            if (feedback == null)
                return false;

            _context.Feedbacks.Remove(feedback);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}