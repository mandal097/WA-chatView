import React, { useRef, useState } from 'react';
import { EditFilled } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '../ModalLayout';
import styles from './EditProductModal.module.scss';
import axios from '../../../config/axios';

const TextArea = ({ value, onChange }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
        ></textarea>
    )
}


const Fields = ({ label, field, product }) => {
    const inputRef = useRef();
    const fieldsRef = useRef();

    const [loading, setLoading] = useState(false)
    const [productName, setProductName] = useState(field);
    const [price, setPrice] = useState(field);
    const [tags, setTags] = useState(field);
    const [location, setLocation] = useState(field);
    const [condition, setCondition] = useState(field);
    const [category, setCategory] = useState(field);
    const [desc, setDesc] = useState(field);




    const handleInputSections = () => {
        const div_ = inputRef.current
        const div_f = fieldsRef.current
        if (div_.style.display === 'none') {
            div_.style.display = 'flex'
            div_f.style.display = 'none'
        } else {
            div_.style.display = 'none'
            div_f.style.display = 'flex'
        }
    };

    const requestUpdate = async (param) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token')
            const res = await axios.put(`/market-place/update-product/${product?._id}`, param,
                {
                    headers: {
                        token: `Bearer ${token}`
                    }
                })
            if (res.data.status === 'err') {
                toast.error(res.data.message)
                setLoading(false);
            }
            if (res.data.status === 'success') {
                toast.success(res.data.message)
                setLoading(false);
            }
        } catch (error) {
            toast.error('Something went wrong')
            setLoading(false);
        }
    }

    const update = () => {
        if (label === 'Product name') {
            requestUpdate({ productName: productName })
        }
        if (label === 'Price') {
            requestUpdate({ price: price })
        }
        if (label === 'Condition') {
            requestUpdate({ condition: condition })
        }
        if (label === 'Category') {
            requestUpdate({ category: category })
        }
        if (label === 'Tags') {
            requestUpdate({ tags: tags })
        }
        if (label === 'Address') {
            requestUpdate({ location: location })
        }
        if (label === 'Description') {
            requestUpdate({ desc: desc })
        }
    };


    return (
        <div className={styles.fields}>
            <ToastContainer className='toaster' />
            <div className={styles.left}>
                <label htmlFor="">{label} :</label>
                <p ref={fieldsRef}>{field}</p>
                <div className={styles.inputs} style={{ display: 'none' }} ref={inputRef}>

                    {(label !== 'Condition' && label !== 'Category') &&
                        <>
                            {label === 'Product name' && <TextArea
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />}
                            {label === 'Price' && <TextArea
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />}
                            {label === 'Tags' && <input
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />}
                            {label === 'Address' && <TextArea
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />}
                            {label === 'Description' && <TextArea
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />}
                        </>
                    }

                    {label === 'Category' &&
                        <select name="" id="" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value='mens-clothing-shoes' >Men's clothing & shoes</option>
                            <option value='womens-clothing-shoes' >Women's clothing & shoes</option>
                            <option value='electronic'>Electronics</option>
                            <option value='books'>Books</option>
                            <option value='furniture'>Furniture</option>
                            <option value='accessories'>Accessories</option>
                            <option value='sports-accessories'>Sports Accessories</option>
                            <option value='miscellaneous'>Miscellaneous</option>
                        </select>
                    }
                    {label === 'Condition' &&
                        <select name="" id="" value={condition} onChange={(e) => setCondition(e.target.value)}>
                            <option value="new" selected>New</option>
                            <option value="used-like-new">Used – like new</option>
                            <option value="used-good" selected>Used – good</option>
                            <option value="used-fair" selected>Used – fair</option>
                        </select>
                    }
                    <div className={styles.btns}>
                        <button onClick={handleInputSections}>Cancel</button>
                        <button onClick={update}>{loading ? 'Updating...' : 'Update'}</button>
                    </div>
                </div>
            </div>
            <div className={styles.right} onClick={handleInputSections}>
                <EditFilled className={styles.icon} />
            </div>
        </div>


    )
}


const EditProductModal = ({ setShowEditModal, product }) => {
    return (
        <Modal
            overflow='scroll'
            width='70rem'
            height='fit-content'
            margin='6rem 0'
            zIndex='10001'
            head='Edit product details'
            onClick={() => {
                setShowEditModal(false)
                // window.location.reload()
            }}
        >

            <div className={styles.edit_product}>
                <Fields
                    product={product}
                    label='Product name'
                    field={product.productName}
                />
                <Fields
                    product={product}
                    label='Price'
                    field={product.price}
                />
                <Fields
                    product={product}
                    label='Condition'
                    field={product.condition}
                />
                <Fields
                    product={product}
                    label='Category'
                    field={product.category}
                />
                <Fields
                    product={product}
                    label='Tags'
                    field={product.tags}
                />
                <Fields
                    product={product}
                    label='Address'
                    field={product.location}
                />
                <Fields
                    product={product}
                    label='Description'
                    field={product.desc}
                />
            </div>
        </Modal>
    )
}

export default EditProductModal