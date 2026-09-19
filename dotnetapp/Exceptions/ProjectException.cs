using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;

namespace dotnetapp.Exceptions
{
    public class ProjectException:Exception
    {
        public ProjectException(string msg):base(msg){}        
    }
}