using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MeetingScheduler.Data;
using MeetingScheduler.Models;
using Microsoft.EntityFrameworkCore;

namespace MeetingScheduler.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MeetingsController : ControllerBase
    {
        private readonly ILogger<MeetingsController> _logger;
        private readonly ApplicationDbContext _context;

        public MeetingsController(ILogger<MeetingsController> logger,
            ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Meeting>> Get() =>
            await _context.Meeting.ToListAsync();

        [HttpPost]
        // [ValidateAntiForgeryToken]
        public async Task<IActionResult> Post(Meeting meeting)
        {
            _context.Add(meeting);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Post), new { id = meeting.Id }, meeting);
        }
    }
}
