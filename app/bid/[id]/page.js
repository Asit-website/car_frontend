"use client";
import LayoutAdmin from "@/components/layout/LayoutAdmin";
import { useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

const baseUrl = "http://localhost:4000";


export default function BidDetails() {


    // const navigate = useNavigate();

    // const [allCars, setAllCars] = useState([]);

    const [data, setData] = useState({});

    const [user, setUser] = useState(null);

    const { id } = useParams();

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
        let ans = await getCars(id, '', '', '');
        console.log(ans);
        setData(ans.data[0]);
    };

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
                            <h4 className="title-dashboard">Bid Details</h4>
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
                                data?.Bid?.map((val, index) => {
                                    return <div key={index} className="singleCar singleCar1">
                                        <p>Amount : {val?.BidAmount}$ </p>
                                        <p>user : {val?.userId?.FullName}</p>
                                        <p>Contact : {val?.userId?.Phone}</p>
                                    </div>
                                })
                            }



                        </div>
                    </div>
                </LayoutAdmin> : <p>404</p>
            }

        </>
    );
}
