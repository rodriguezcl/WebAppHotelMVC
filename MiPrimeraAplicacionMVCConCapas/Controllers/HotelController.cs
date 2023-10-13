using Capa_Entidad;
using Capa_Negocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class HotelController : Controller
    {
        // GET: Hotel
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarHotel()
        {
            HotelBL oHotelBL = new HotelBL();
            return Json(oHotelBL.listarHotel(), JsonRequestBehavior.AllowGet);
        }

        public int guardarHotel(HotelCLS oHotelCLS)
        {
            HotelBL oHotelBL = new HotelBL();
            return oHotelBL.guardarHotel(oHotelCLS);
        }
    }
}