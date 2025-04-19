'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaUpload, FaPlus, FaTrash } from 'react-icons/fa';

export default function AddProductPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    features: [''],
    image: null as File | null
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    // 인증 상태 확인
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      setIsAuthenticated(isLoggedIn);
      
      if (!isLoggedIn) {
        router.push('/admin/login');
      } else {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  // 이미지 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductData({ ...productData, image: file });
      
      // 이미지 미리보기
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      
      // 이미지 에러 초기화
      setFormErrors({ ...formErrors, image: '' });
    }
  };

  // 입력값 변경 처리
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
    
    // 에러 초기화
    if (name in formErrors) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // 특징 추가
  const addFeature = () => {
    setProductData({
      ...productData,
      features: [...productData.features, '']
    });
  };

  // 특징 변경
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...productData.features];
    updatedFeatures[index] = value;
    setProductData({
      ...productData,
      features: updatedFeatures
    });
  };

  // 특징 삭제
  const removeFeature = (index: number) => {
    const updatedFeatures = productData.features.filter((_, i) => i !== index);
    setProductData({
      ...productData,
      features: updatedFeatures
    });
  };

  // 폼 검증
  const validateForm = () => {
    let valid = true;
    const errors = { ...formErrors };
    
    if (!productData.name.trim()) {
      errors.name = '제품명을 입력해주세요';
      valid = false;
    }
    
    if (!productData.category.trim()) {
      errors.category = '카테고리를 선택해주세요';
      valid = false;
    }
    
    if (!productData.description.trim()) {
      errors.description = '제품 설명을 입력해주세요';
      valid = false;
    }
    
    if (!productData.image) {
      errors.image = '제품 이미지를 업로드해주세요';
      valid = false;
    }
    
    setFormErrors(errors);
    return valid;
  };

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 여기서 실제 API 연동 코드 추가
      // 예: 
      // const formData = new FormData();
      // formData.append('name', productData.name);
      // formData.append('category', productData.category);
      // ...
      // await fetch('/api/products', { method: 'POST', body: formData });
      
      // 임시 지연 처리 (실제 API 호출 시 제거)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('제품이 성공적으로 등록되었습니다.');
      router.push('/admin/products');
    } catch (error) {
      console.error('제품 등록 오류:', error);
      alert('제품 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/admin/products" className="mr-4 text-blue-900 hover:text-blue-700">
            <FaArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">새 제품 등록</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-md shadow p-6">
          {/* 제품명 */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              제품명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="제품명을 입력하세요"
              className={`w-full px-4 py-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={productData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
          </div>

          {/* 카테고리 */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              className={`w-full px-4 py-2 border rounded-md ${formErrors.category ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={productData.category}
              onChange={handleInputChange}
            >
              <option value="">카테고리 선택</option>
              <option value="보호계전기">보호계전기</option>
              <option value="전력관리시스템">전력관리시스템</option>
              <option value="배전반">배전반</option>
              <option value="기타제품">기타제품</option>
            </select>
            {formErrors.category && <p className="mt-1 text-sm text-red-500">{formErrors.category}</p>}
          </div>

          {/* 제품 이미지 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              제품 이미지 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center justify-center border-2 border-dashed rounded-md border-gray-300 p-4">
              {previewImage ? (
                <div className="relative">
                  <img src={previewImage} alt="이미지 미리보기" className="h-64 object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      setProductData({ ...productData, image: null });
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>이미지 업로드</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">또는 여기로 파일을 끌어다 놓으세요</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF 최대 10MB</p>
                </div>
              )}
            </div>
            {formErrors.image && <p className="mt-1 text-sm text-red-500">{formErrors.image}</p>}
          </div>

          {/* 제품 설명 */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              제품 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="제품에 대한 자세한 설명을 입력하세요"
              className={`w-full px-4 py-2 border rounded-md ${formErrors.description ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={productData.description}
              onChange={handleInputChange}
            />
            {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
          </div>

          {/* 특징 목록 */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">제품 특징</label>
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <FaPlus className="mr-1" /> 특징 추가
              </button>
            </div>
            
            {productData.features.map((feature, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  placeholder={`특징 ${index + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                />
                {productData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 p-2 text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* 버튼 */}
          <div className="flex justify-end mt-8 space-x-4">
            <Link href="/admin/products">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                취소
              </button>
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-blue-900 hover:bg-blue-800 focus:outline-none ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  처리 중...
                </span>
              ) : (
                '제품 등록'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 