import React from 'react';
import styles from './Browse.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../../../config/axios';
import { toast } from 'react-toastify';
import Loading from '../../Loading/Loading';
import { useLocation, useSearchParams } from 'react-router-dom';

const Browse = ({ type }) => {
  const sectionRef = useRef();
  const [width, setWidth] = useState(Number);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const category = location.pathname.split('/')[3];

  const [searchProducts, setSearchProducts] = useState([]);
  const [searchParam] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState()


  useEffect(() => {
    if (type === 'searched') {
      setSearchTerm(searchParam.get('q'));
    }
  }, [searchParam, type])

  useEffect(() => {
    const totalWidth = sectionRef.current.clientWidth;
    const cardWidth = totalWidth / 5;
    setWidth(cardWidth - 14)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // const res = await axios.get(`/market-place/products/electronic`,{
        //   headers: {
        //     token: `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        const res = category === undefined ?
          await axios.get(`/market-place/all-products`, {
            headers: {
              token: `Bearer ${localStorage.getItem('token')}`
            }
          })
          : await axios.get(`/market-place/products/${category}`, {
            headers: {
              token: `Bearer ${localStorage.getItem('token')}`
            }
          })
        if (res.data.status === 'err') {
          toast.error(res.data.message);
          setLoading(false);
        }
        if (res.data.status === 'success') {
          setProducts(res.data.data);
          // console.log(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error('Something went wrong')
      }
    }
    fetchProducts()
  }, [category]);


  useEffect(() => {
    if (type === "searched") {
      const search = products.filter((product) => {
        if (searchTerm === '') {
          return false
        } else if (product.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return product
        }
        return false;
      });
      setSearchProducts(search);
    }
  }, [searchTerm, products, type])

  return (
    <div className={styles.browse}>
      <div className={styles.section_}>
        <div className={styles.top}>
          {
            type === 'searched' ?
              <>
                <span>Your searched for {searchTerm} </span>
              </>
              :
              <>
                {!category ? <span>All Products</span>
                  : <span>{category?.replace(/-/g, " ").replace(/ /g, " ")}</span>}
              </>
          }
        </div>
        <div className={styles.section} ref={sectionRef}>
          {
            loading && <Loading font='15rem' color='var(--text)' />
          }

          {type === 'searched' ?
            searchProducts?.map(product => (
              <ProductCard
                key={product._id}
                width={width}
                product={product}
              />
            ))

            :
            products?.map(product => (
              <ProductCard
                key={product._id}
                width={width}
                product={product}
              />
            ))
          }

          {products.length === 0 && <h1 style={{ fontSize: '2rem', color: 'var(--text)' }}>No Listed products</h1>}

        </div>
      </div>
    </div>
  )
}

// const Browse = ({ type }) => {
//   return (
//     <>
//       {type === 'searched'
//         ?
//         <div>hello</div>
//         :
//         <DefaultComponent />
//       }
//     </>
//   )
// }

export default Browse