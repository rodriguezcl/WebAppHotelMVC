﻿using Capa_Entidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Datos
{
    public class HotelDAL:CadenaDAL
    {
        public int guardarHotel(HotelCLS oHotelCLS)
        {
            int rpta = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspGuardarHotel", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idhotel", oHotelCLS.iidhotel);
                        cmd.Parameters.AddWithValue("@nombre", oHotelCLS.nombre);
                        cmd.Parameters.AddWithValue("@descripcion", oHotelCLS.descripcion);
                        cmd.Parameters.AddWithValue("@direccion", oHotelCLS.direccion);
                        cmd.Parameters.AddWithValue("@nombreArchivo", oHotelCLS.nombrearchivo);
                        rpta = cmd.ExecuteNonQuery();
                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

        public List<HotelCLS> listarHotel()
        {
            List<HotelCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("uspListarHotel", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<HotelCLS>();
                            HotelCLS oHotelCLS;
                            int posId = drd.GetOrdinal("IIDHOTEL");
                            int posNombre = drd.GetOrdinal("NOMBRE");
                            int posDireccion = drd.GetOrdinal("DIRECCION");
                            while (drd.Read())
                            {
                                oHotelCLS = new HotelCLS();
                                oHotelCLS.iidhotel = drd.IsDBNull(posId) ? 0 :
                                    drd.GetInt32(posId);
                                oHotelCLS.nombre = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oHotelCLS.direccion = drd.IsDBNull(posDireccion) ? ""
                                    : drd.GetString(posDireccion);
                                lista.Add(oHotelCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }
    }
}
