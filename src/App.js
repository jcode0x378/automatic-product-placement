import React, { useCallback, useEffect, useState } from 'react';
import { fetchProducts, updateProduct } from './api';
import EditModal from './components/EditModal';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import UpdateMessage from './components/UpdateMessage';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [shortDescriptionFilter, setShortDescriptionFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [updateQueue, setUpdateQueue] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [updateMessage, setUpdateMessage] = useState('');
  const [shouldFetchData, setShouldFetchData] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchProductsData = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        search: currentSearchTerm,
        per_page: 100,
        page: currentPage,
      };
      const data = await fetchProducts(params);

      if (data && data.length > 0) {
        // 根據 shortDescriptionFilter 進行篩選
        const filteredData = data.filter(product => {
          if (shortDescriptionFilter === 'notEmpty') {
            return (
              !product.short_description ||
              product.short_description.trim().length === 0
            );
          }
          if (shortDescriptionFilter === 'Empty') {
            return (
              product.short_description &&
              product.short_description.trim().length > 0
            );
          }

          return true; // 'all' 或其他情況下顯示所有商品
        });

        setProducts(filteredData);
        setUpdateMessage('獲取商品成功');
      } else {
        setUpdateMessage('沒有商品數據');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setUpdateMessage('獲取商品失敗');
    } finally {
      setIsLoading(false);
    }
  }, [currentSearchTerm, currentPage, shortDescriptionFilter]);

  useEffect(() => {
    if (shouldFetchData && !isInitialLoad) {
      fetchProductsData();
    }
    setIsInitialLoad(false);
  }, [fetchProductsData, shouldFetchData, isInitialLoad]);

  const handleSearch = e => {
    setCurrentSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = e => {
    setShortDescriptionFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleBrandChange = e => {
    setCurrentSearchTerm(e.target.value);
    setCurrentPage(1);
    setShouldFetchData(true);
  };

  const handleEditProduct = product => {
    setEditProduct(product);
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      await updateProduct(id, updatedData);
      setUpdateQueue(prevQueue => prevQueue.filter(item => item.id !== id));
      showUpdateMessage('商品更新成功！');
      fetchProductsData();
    } catch (error) {
      showUpdateMessage('更新失敗：' + error.message, true);
    }
  };

  const processUpdateQueue = async () => {
    try {
      for (const item of updateQueue) {
        await updateProduct(item.id, item.data);
      }
      showUpdateMessage('所有商品更新成功！');
      setUpdateQueue([]);
      fetchProductsData();
    } catch (error) {
      showUpdateMessage('更新失敗：' + error.message, true);
    }
  };

  const showUpdateMessage = (message, isError = false) => {
    setUpdateMessage(message);
    setTimeout(() => {
      setUpdateMessage('');
    }, 3000);
  };

  const handleFilterProducts = () => {
    setShouldFetchData(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                  KD 商品修改系統
                </h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <ProductForm
                searchTerm={currentSearchTerm}
                onSearchChange={handleSearch}
                filter={shortDescriptionFilter}
                onFilterChange={handleFilterChange}
                onBrandChange={handleBrandChange}
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleFilterProducts}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  篩選商品
                </button>
                {updateQueue.length > 0 && (
                  <button
                    onClick={processUpdateQueue}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    送出已修改數據
                  </button>
                )}
              </div>
              {shouldFetchData ? (
                isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner"></div>
                    <p className="mt-2 text-gray-600">加載中...</p>
                  </div>
                ) : (
                  <ProductList
                    products={products}
                    updateQueue={updateQueue}
                    onEdit={handleEditProduct}
                  />
                )
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600">點擊上方按鈕篩選商品</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <UpdateMessage
        message={updateMessage}
        isError={updateMessage.includes('失敗')}
      />
      {editProduct && (
        <EditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleUpdateProduct}
        />
      )}
    </div>
  );
}

export default App;
