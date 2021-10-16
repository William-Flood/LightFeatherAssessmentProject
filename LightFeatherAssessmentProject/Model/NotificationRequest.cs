using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LightFeatherAssessmentProject.Model
{
    public class NotificationRequest
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public String PhoneNumber { get; set; }
        public String Supervisor { get; set; }
    }
}
