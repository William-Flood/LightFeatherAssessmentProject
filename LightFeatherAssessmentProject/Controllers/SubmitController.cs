using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LightFeatherAssessmentProject.Model;

namespace LightFeatherAssessmentProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmitController : ControllerBase
    {
        [HttpPost]
        public String Submit(NotificationRequest val) {
            if(String.IsNullOrEmpty(val.FirstName)) {
                return "First Name Missing";
            }
            if (String.IsNullOrEmpty(val.LastName)) {
                return "Last Name Missing";
            }
            if (String.IsNullOrEmpty(val.Supervisor)) {
                return "Supervisor Missing";
            }
            Console.WriteLine(val.FirstName);
            Console.WriteLine(val.LastName);
            return "Submission Received";
        }
    }
}
