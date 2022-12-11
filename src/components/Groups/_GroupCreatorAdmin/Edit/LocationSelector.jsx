import React, { useEffect, useState } from 'react';
import styles from './Edit.module.scss';
import { EditFilled, GlobalOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../../config/axios';
import Loading from '../../../Loading/Loading';
import { Country, } from 'country-state-city'
import { updateLocation } from '../../../../redux/currentGroup';
import Map from './Map';
import { groupActivityLogs } from '../../../../helpers/groupActivities';


const LocationSelector = () => {
    const { currentGroup } = useSelector(state => state.currentGroup)
    const [show, setShow] = useState(false);
    const [disable, setDisable] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [countryList, setCountryList] = useState([]);
    const [inputCountry, setInputCountry] = useState();
    const [country, setCountry] = useState(currentGroup?.location);

    useEffect(() => {
        if (country?.name === currentGroup?.location?.name) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [currentGroup, country]);


    const update = async () => {
        if (country?.name === currentGroup?.location?.name) {
            toast.error('Already exists')
        }
        try {
            setLoading(true)
            const res = await axios.put(`/groups/update/${currentGroup?._id}`, {
                location: country
            }, {
                headers: {
                    token: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.status === 'err') {
                toast.error(res.data.message);
                setLoading(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message);
                dispatch(updateLocation(country));
                groupActivityLogs(currentGroup?._id, `changed the group location to ${country.name}.`)
                setLoading(false);
            }
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong');
        }
    };


    useEffect(() => {
        setCountryList(Country.getAllCountries());
    }, [])

    useEffect(() => {
        const countries = Country.getAllCountries()
        const search = countries.filter((country) => {
            if (inputCountry === '') {
                return false
            } else if (country?.name?.trim().toLowerCase().includes(inputCountry?.toLowerCase().trim())) {
                return country
            }
            return false;
        });
        if (search.length === 0) {
            setCountryList(countries)
        }
        if (search.length > 0) {
            setCountryList(search)
        }
    }, [inputCountry, countryList])



    return (
        <>
            <ToastContainer className='toaster' />
            <div className={styles.edit_field} style={{ borderBottom: show && 'none' }}>
                <div>
                    <span>Location</span>
                    <small>{currentGroup?.location?.name ? currentGroup?.location?.name : country?.name}</small>
                </div>
                {!show && <button className={styles.icon_}
                    onClick={() => setShow(!show)}
                >
                    <EditFilled className={styles.icon} />
                </button>}
            </div>

            {show && <div className={styles.radios}>

                <Map country={currentGroup?.location} />

                <div className={styles.location}>
                    <input
                        placeholder='Search your country...'
                        value={inputCountry}
                        onChange={(e) => setInputCountry(e.target.value)}
                        type="text" />
                    {/* <input
                        placeholder='Search city...'
                        value={inputCity}
                        onChange={(e) => setInputCity(e.target.value)}
                        type="text" /> */}


                    {/* {countryList && */}
                    <div className={`${styles.selection_} ${'custom_scroll'}`}>

                        {

                            countryList?.map((c, index) => (

                                <div
                                    key={index}
                                    className={`${styles.radio} ${currentGroup?.location?.name === c.name && styles.radio_active}`} onClick={() => {
                                        setCountry(c)
                                    }}>
                                    <div className={styles.icon_}>
                                        <GlobalOutlined className={styles.icon} />
                                    </div>
                                    <div className={styles.type}>
                                        <span style={{ fontSize: '1.5rem' }}>{c.name}</span>
                                    </div>
                                    <div className={styles.state}>
                                        {
                                            country?.name === c?.name && <div></div>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>

                <div className={styles.btns}>
                    <button onClick={() => setShow(!show)}>Cancel</button>
                    <button disabled={disable} className={`${disable && styles.disabled}`}
                        onClick={update}
                    >{loading ? <Loading font='3rem' color='white' /> : "Save"}
                    </button>
                </div>

            </div>}
        </>
    )
}

export default LocationSelector