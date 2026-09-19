using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage;
using System.ComponentModel.DataAnnotations.Schema;

namespace dotnetapp.Models
{
    public class ProjectProposal
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProposalId {get; set;}
        [Required]
        public string ProposalTitle {get; set;}
        [Required]
        public string ProposalDescription {get; set;}
        [Required]
        public string Status {get; set;}
        [Required]
        public int UserId {get; set;}
        [JsonIgnore]
        public User? User {get; set;}

    }
}