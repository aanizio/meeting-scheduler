using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MeetingScheduler.Data;
using MeetingScheduler.Models;

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
        public IEnumerable<Meeting> Get()
        {
            return _context.Meeting.AsEnumerable();
            // var rng = new Random();
            // return Enumerable.Range(1, 5)
            //     .Select(index => new Meeting() {
            //         Title = "test",
            //         Start = DateTime.Now.AddDays(rng.Next(-20, 55))
            //     })
            //     .ToArray();
        }
    }
}
