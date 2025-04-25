'use client';

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaPlus, FaPencilAlt, FaTrash, FaStar, FaImage, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";

// 제품 데이터 인터페이스
interface ProductData {
  id: number;
  name: string;
  category: string;
  images: string[];
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  isFeatured: boolean;
  isNewProduct: boolean;
  createdAt: string;
}

// 샘플 제품 데이터
const initialProducts: ProductData[] = [
  {
    id: 1,
    name: "YJ-3000 파워 시스템",
    category: "인버터",
    images: ["/images/products/product-1.jpg"],
    description: "YJ-3000 모델은 고효율 전력 변환 시스템으로 안정적인 전원 공급이 필요한 산업 환경에 적합합니다.",
    features: [
      "99.5% 이상의 전력 변환 효율",
      "과부하 및 과열 방지 시스템",
      "원격 모니터링 지원",
      "확장 가능한 모듈형 설계"
    ],
    specifications: {
      "입력 전압": "380V-415V, 3상",
      "출력 전압": "220V-240V, 단상",
      "최대 출력 전력": "3000W",
      "효율성": "99.5%",
      "작동 온도": "-10°C ~ 50°C",
      "크기(WxHxD)": "600 x 800 x 200 mm",
      "무게": "45kg"
    },
    isFeatured: true,
    isNewProduct: true,
    createdAt: "2023-08-15"
  },
  {
    id: 2,
    name: "YJ-2500 배터리 시스템",
    category: "배터리",
    images: ["/images/products/product-2.jpg"],
    description: "YJ-2500 배터리 시스템은 안정적인 전력 저장을 위한 최첨단 솔루션으로, 다양한 산업 및 상업 환경에서 사용할 수 있습니다.",
    features: [
      "10년 이상의 배터리 수명",
      "빠른 충전 기능",
      "스마트 배터리 관리 시스템",
      "안전 과충전 방지 기능"
    ],
    specifications: {
      "배터리 유형": "리튬 인산철",
      "용량": "2500Wh",
      "충전 시간": "2-3시간",
      "작동 온도": "-5°C ~ 45°C",
      "크기(WxHxD)": "500 x 600 x 150 mm",
      "무게": "38kg"
    },
    isFeatured: false,
    isNewProduct: false,
    createdAt: "2023-05-20"
  },
  {
    id: 3,
    name: "YJ-5000 통합 전력 관리 시스템",
    category: "통합 시스템",
    images: ["/images/products/product-3.jpg"],
    description: "YJ-5000은 인버터, 배터리, 관리 시스템이 통합된 올인원 솔루션으로 완벽한 전력 관리를 제공합니다.",
    features: [
      "실시간 전력 사용 모니터링",
      "AI 기반 전력 최적화",
      "원격 제어 및 관리",
      "확장 가능한 시스템 구조"
    ],
    specifications: {
      "최대 처리 전력": "5000W",
      "지원 배터리": "모든 YJ 시리즈 배터리",
      "통신 프로토콜": "Modbus, CAN, Ethernet",
      "모니터링 인터페이스": "웹, 모바일 앱",
      "크기(WxHxD)": "800 x 1000 x 300 mm",
      "무게": "75kg"
    },
    isFeatured: true,
    isNewProduct: true,
    createdAt: "2023-09-05"
  }
];

// 제품 카테고리 목록
const categories = ["인버터", "배터리", "통합 시스템", "액세서리", "소프트웨어"];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductData[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("전체");
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [newOnly, setNewOnly] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);

  // 파일 입력 참조
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 검색 처리
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 카테고리 필터 처리
  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  // 필터링된 제품 목록
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "전체" || product.category === categoryFilter;
      const matchesFeatured = !featuredOnly || product.isFeatured;
      const matchesNew = !newOnly || product.isNewProduct;
      
      return matchesSearch && matchesCategory && matchesFeatured && matchesNew;
    });

  // 새 제품 추가 모달 열기
  const openAddModal = () => {
    const newProduct: ProductData = {
      id: Math.max(0, ...products.map(p => p.id)) + 1,
      name: "",
      category: "인버터",
      images: [],
      description: "",
      features: [""],
      specifications: { "": "" },
      isFeatured: false,
      isNewProduct: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setCurrentProduct(newProduct);
    setEditMode(false);
    setIsModalOpen(true);
  };

  // 제품 편집 모달 열기
  const openEditModal = (product: ProductData) => {
    setCurrentProduct(JSON.parse(JSON.stringify(product))); // 깊은 복사
    setEditMode(true);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  // 이미지 업로드 클릭 핸들러
  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !currentProduct) return;

    const updatedProduct = { ...currentProduct };
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // 실제 구현에서는 서버에 이미지를 업로드하고 URL을 받아야 합니다.
      // 현재는 임시 로컬 URL을 생성합니다.
      const imageUrl = URL.createObjectURL(file);
      updatedProduct.images.push(imageUrl);
    }
    
    setCurrentProduct(updatedProduct);
    
    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 이미지 제거 핸들러
  const removeImage = (index: number) => {
    if (!currentProduct) return;
    
    const updatedImages = [...currentProduct.images];
    updatedImages.splice(index, 1);
    
    setCurrentProduct({
      ...currentProduct,
      images: updatedImages
    });
  };

  // 기능(feature) 추가
  const addFeature = () => {
    if (!currentProduct) return;
    
    setCurrentProduct({
      ...currentProduct,
      features: [...currentProduct.features, ""]
    });
  };

  // 기능(feature) 변경
  const updateFeature = (index: number, value: string) => {
    if (!currentProduct) return;
    
    const updatedFeatures = [...currentProduct.features];
    updatedFeatures[index] = value;
    
    setCurrentProduct({
      ...currentProduct,
      features: updatedFeatures
    });
  };

  // 기능(feature) 제거
  const removeFeature = (index: number) => {
    if (!currentProduct) return;
    
    const updatedFeatures = [...currentProduct.features];
    updatedFeatures.splice(index, 1);
    
    setCurrentProduct({
      ...currentProduct,
      features: updatedFeatures
    });
  };

  // 사양(specification) 추가
  const addSpecification = () => {
    if (!currentProduct) return;
    
    setCurrentProduct({
      ...currentProduct,
      specifications: {
        ...currentProduct.specifications,
        "": ""
      }
    });
  };

  // 사양(specification) 키 변경
  const updateSpecificationKey = (oldKey: string, newKey: string) => {
    if (!currentProduct) return;
    
    const { [oldKey]: value, ...restSpecs } = currentProduct.specifications;
    
    setCurrentProduct({
      ...currentProduct,
      specifications: {
        ...restSpecs,
        [newKey]: value
      }
    });
  };

  // 사양(specification) 값 변경
  const updateSpecificationValue = (key: string, value: string) => {
    if (!currentProduct) return;
    
    setCurrentProduct({
      ...currentProduct,
      specifications: {
        ...currentProduct.specifications,
        [key]: value
      }
    });
  };

  // 사양(specification) 제거
  const removeSpecification = (key: string) => {
    if (!currentProduct) return;
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _, ...restSpecs } = currentProduct.specifications;
    
    setCurrentProduct({
      ...currentProduct,
      specifications: restSpecs
    });
  };

  // 제품 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct) return;
    
    // 필수 필드 검증
    if (!currentProduct.name || !currentProduct.description || currentProduct.images.length === 0) {
      alert("제품명, 설명, 이미지는 필수 항목입니다.");
      return;
    }
    
    // 빈 기능 및 사양 필터링
    const filteredFeatures = currentProduct.features.filter(f => f.trim() !== "");
    
    const filteredSpecifications: {[key: string]: string} = {};
    Object.entries(currentProduct.specifications).forEach(([key, value]) => {
      if (key.trim() !== "" && value.trim() !== "") {
        filteredSpecifications[key] = value;
      }
    });
    
    const updatedProduct = {
      ...currentProduct,
      features: filteredFeatures,
      specifications: filteredSpecifications
    };
    
    // 기존 제품 수정 또는 새 제품 추가
    if (editMode) {
      setProducts(prev => 
        prev.map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } else {
      setProducts(prev => [...prev, updatedProduct]);
    }
    
    closeModal();
  };

  // 제품 삭제 처리
  const handleDeleteProduct = (id: number) => {
    if (confirm("이 제품을 삭제하시겠습니까?")) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  // 필터 토글
  const toggleFeaturedOnly = () => {
    setFeaturedOnly(prev => !prev);
  };

  const toggleNewOnly = () => {
    setNewOnly(prev => !prev);
  };

  return (
    <AdminLayout title="제품 관리">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={openAddModal}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          새 제품 추가
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="제품명, 설명, 카테고리 검색..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="전체">전체 카테고리</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={toggleFeaturedOnly}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">추천 제품만 보기</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={newOnly}
                onChange={toggleNewOnly}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">신규 제품만 보기</span>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">이미지</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제품명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">카테고리</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-12 w-16 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center">
                          <FaImage className="text-gray-400" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{product.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {product.isFeatured && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            추천
                          </span>
                        )}
                        {product.isNewProduct && (
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            신규
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                        title="편집"
                      >
                        <FaPencilAlt />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                        title="삭제"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 제품 추가/편집 모달 */}
      {isModalOpen && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold">
                {editMode ? "제품 편집" : "새 제품 추가"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    제품명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentProduct.name}
                    onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    카테고리 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  제품 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    이미지 <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleImageUploadClick}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <FaCloudUploadAlt className="mr-1" />
                    이미지 업로드
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </div>
                <div className="flex flex-wrap gap-4 p-4 border border-gray-300 rounded-lg min-h-[100px]">
                  {currentProduct.images.length > 0 ? (
                    currentProduct.images.map((image, index) => (
                      <div key={index} className="relative w-24 h-24">
                        <img 
                          src={image} 
                          alt={`제품 이미지 ${index + 1}`} 
                          className="w-24 h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full text-gray-400">
                      <FaImage size={24} />
                      <p className="text-sm mt-2">이미지가 없습니다</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    주요 특징
                  </label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <FaPlus className="mr-1" />
                    특징 추가
                  </button>
                </div>
                <div className="space-y-2">
                  {currentProduct.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="제품 특징을 입력하세요"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    제품 사양
                  </label>
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <FaPlus className="mr-1" />
                    사양 추가
                  </button>
                </div>
                <div className="space-y-2">
                  {Object.entries(currentProduct.specifications).map(([key, value], index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={key}
                        onChange={(e) => updateSpecificationKey(key, e.target.value)}
                        placeholder="사양 이름"
                        className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateSpecificationValue(key, e.target.value)}
                        placeholder="사양 값"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecification(key)}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentProduct.isFeatured}
                    onChange={(e) => setCurrentProduct({...currentProduct, isFeatured: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">추천 제품으로 표시</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentProduct.isNewProduct}
                    onChange={(e) => setCurrentProduct({...currentProduct, isNewProduct: e.target.checked})}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700">신규 제품으로 표시</span>
                </label>
              </div>
              
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editMode ? "저장" : "추가"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}