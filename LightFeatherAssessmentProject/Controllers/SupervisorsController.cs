using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LightFeatherAssessmentProject.Model;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace LightFeatherAssessmentProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupervisorsController : ControllerBase
    {
        [HttpGet]
        public async Task<List<String>> Supervisors() {

            var client = new HttpClient();
            var managerResponse = await client.GetAsync("https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers");
            var managerJSON = await managerResponse.Content.ReadAsStringAsync();
            var supervisorList = JsonConvert.DeserializeObject<List<Supervisor>>(managerJSON);
            supervisorList.Sort((Supervisor a, Supervisor b) => {
                if (a.Jurisdiction.CompareTo(b.Jurisdiction) > 0 || a.Jurisdiction.CompareTo(b.Jurisdiction) == 0 && (
                    a.LastName.CompareTo(b.LastName) > 0 || a.LastName.CompareTo(b.LastName) == 0 && (
                        a.FirstName.CompareTo(b.FirstName) > 0
                    )
                )) {
                    return 1;
                } else if (b.Jurisdiction.CompareTo(a.Jurisdiction) > 0 || b.Jurisdiction.CompareTo(a.Jurisdiction) == 0 && (
                    b.LastName.CompareTo(a.LastName) > 0 || b.LastName.CompareTo(a.LastName) == 0 && (
                        b.FirstName.CompareTo(a.FirstName) > 0
                    )
                )) {
                    return -1;
                } else {
                    return 0;
                }
            }

                );
            var returnList = new List<String>();
            var alphaTest = new Regex(@"^[a-zA-Z]+$");
            foreach(var supervisor in supervisorList) {
                if(alphaTest.IsMatch(supervisor.Jurisdiction)) {
                    returnList.Add(supervisor.Jurisdiction + " - " + supervisor.LastName + ", " + supervisor.FirstName);
                }
            }
            return returnList;
        }
    }
}
