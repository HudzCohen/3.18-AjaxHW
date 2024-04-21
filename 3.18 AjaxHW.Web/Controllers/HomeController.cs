using _3._18_AjaxHW.Data;
using _3._18_AjaxHW.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;

namespace _3._18_AjaxHW.Web.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress; Initial Catalog=PersonDBO;Integrated Security=True;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            var repo = new PeopleRepo(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public IActionResult AddPerson(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(p);
            return Json(p);
        }

        [HttpPost]
       public void DeletePerson(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.DeletePerson(id);
        }

        [HttpPost]
        public void EditPerson(Person p)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.EditPerson(p);
        }

        public IActionResult GetPersonById(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            Person person = repo.GetPersonById(id);
            return Json(person);
        }
    }
}
