"use client";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import Link from "next/link";

const baseUrl = "http://localhost:4000";


export default function AllInventory() {


    // const navigate = useNavigate();

    const [allCars, setAllCars] = useState([]);

    const [user, setUser] = useState(null);

    // const fetchCars = async () => {
    //     try {
    //         const response = await fetch(`${baseUrl}/seller/getAllCars`, {
    //             method: 'GET',
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         if (data?.status) {
    //             setAllCars(data?.data);
    //         }
    //     } catch (error) {
    //         console.log('eerr', error);
    //     }
    // }

    const getCars = async (id, query, page, perPage) => {
        const resp = await fetch(`${baseUrl}/seller/getAllCars?id=${id}&query=${query}&page=${page}&perPage=${perPage}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': localStorage.getItem('Car_token')
          }
        });
        const data = await resp.json();
        return data;
      };

      const getData = async () => {
        let ans = await getCars("", "", "", "");
        setAllCars(ans.data);
    }

    useEffect(() => {
        const car_user = JSON.parse(localStorage.getItem("Car_user"));
        setUser(car_user);
        getData();

    }, [])



    return (
        <>
            {
                user?.AccountType === "Admin" ? <LayoutAdmin headerStyle={1} footerStyle={1}>
                    <div className="row">
                        <div className="col-md-6">
                            <h4 className="title-dashboard">All Inventory</h4>
                        </div>
                    </div>
                    <div className="show-dashboard">
                        <span className="btn-show-dashboard">
                            <i className="icon-th-list" />
                            Show Dashboard
                        </span>
                    </div>
                    <div className="table-listing-inventory">
                        <div className="car_det">
                        {
                            allCars?.map((car, index) => (
                                <div key={index} className="singleCar">

                                    <img src={car?.Photos[0]} alt="" />
                                    <h4>{car?.Model}</h4>
                                    <p>Owner : {car?.userId?.FullName}</p>
                                   <Link href={`/bid/${car?._id}`}><p >Bid Detail</p></Link>

                                </div>
                            ))
                        }
                        </div>
                    </div>
                </LayoutAdmin> : <p>404</p>
            }

        </>
    );
}
