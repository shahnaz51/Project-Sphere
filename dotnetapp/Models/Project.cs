using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class Project
    {
        [Key]
        public int ProjectId{get;set;}
        [Required]
        public string ProjectTitle{get;set;}
        [Required]
        public string ProjectDescription{get;set;}
        [Required]
        public DateTime StartDate{get;set;}
        [Required]
        public DateTime EndDate{get;set;}
        [Required]
        public string FrontEndTechStack{get;set;}
        [Required]
        public string BackendTechStack{get;set;}
        [Required]
        public string Database{get;set;}
        [Required]
        public string Status{get;set;}
    }
}