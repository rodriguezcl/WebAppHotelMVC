﻿using Capa_Datos;
using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Negocio
{
    public class HotelBL
    {
        public List<HotelCLS> listarHotel()
        {
            HotelDAL oHotel = new HotelDAL();
            return oHotel.listarHotel();
        }

        public int guardarHotel(HotelCLS oHotelCLS)
        {
            HotelDAL oHotel = new HotelDAL();
            return oHotel.guardarHotel(oHotelCLS);
        }
    }
}
