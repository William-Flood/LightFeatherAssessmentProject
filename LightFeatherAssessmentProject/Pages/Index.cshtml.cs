using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using System.Net.Http;

namespace LightFeatherAssessmentProject.Pages
{
    public class IndexModel : PageModel
    {
        public List<String> SupervisorList { get; set; }
        public async Task OnGet()
        {
            // Note: React.ASPNet can't perform XMLHttpRequest operations inside componentDidMount when using server-side rendering.
            var client = new HttpClient();
            var managerResponse = await client.GetAsync(Url.Action("Supervisors", "Supervisors", null, Request.Scheme));
            var managerJSON = await managerResponse.Content.ReadAsStringAsync();
            this.SupervisorList = JsonConvert.DeserializeObject<List<String>>(managerJSON);
        }
    }
}
