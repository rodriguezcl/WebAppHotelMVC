using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Filter
{
	public class Seguridad : ActionFilterAttribute
	{

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			var persona=  HttpContext.Current.Session["persona"];
			if (persona == null)
			{
				filterContext.Result = new RedirectResult("~/Login/Index");
			}
			base.OnActionExecuting(filterContext);
		}

	}
}