// components/Form.jsx
import React, { useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const Form = ({ onClose, theme }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // 📝 قوانین اعتبارسنجی - فقط برای ۴ فیلد
  const validationSchema = yup.object({
    firstName: yup.string()
      .required('نام الزامی است')
      .min(2, 'نام باید حداقل ۲ کاراکتر باشد')
      .max(30, 'نام حداکثر ۳۰ کاراکتر'),

    lastName: yup.string()
      .required('نام خانوادگی الزامی است')
      .min(2, 'نام خانوادگی حداقل ۲ کاراکتر')
      .max(30, 'نام خانوادگی حداکثر ۳۰ کاراکتر'),

    mobile: yup.string()
      .required('شماره موبایل الزامی است')
      .matches(/^09[0-9]{9}$/, 'شماره موبایل باید با ۰۹ شروع و ۱۱ رقم باشد'),

    email: yup.string()
      .email('ایمیل معتبر نیست')
      .required('ایمیل الزامی است'),
  });

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      
      const dataToSend = {
        ...formData,
        submittedAt: new Date().toISOString()
      };

      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setSubmitResult({
        type: 'success',
        message: '✅ اطلاعات با موفقیت ثبت شد!',
        data: response.data
      });
      
      // پاک کردن فرم بعد از موفقیت
      setFormData({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
      });
      setErrors({});

      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error) {
      if (error.name === 'ValidationError') {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
        setSubmitResult({
          type: 'error',
          message: '❌ لطفاً خطاهای فرم را اصلاح کنید'
        });
      } else if (error.response) {
        setSubmitResult({
          type: 'error',
          message: `❌ خطای سرور: ${error.response.status}`
        });
      } else {
        setSubmitResult({
          type: 'error',
          message: '❌ خطا در اتصال به سرور'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* پس‌زمینه تیره */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        style={{ opacity: isClosing ? 0 : 1 }}
        onClick={handleClose}
      />

      {/* Modal */}
      <div 
        className={`fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div 
          className={`w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
            theme === 'dark' 
              ? 'bg-gray-800 text-white' 
              : 'bg-white text-gray-900'
          }`}
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
        >
          <div className={`sticky top-0 z-10 flex justify-center items-center p-6 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          } ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold flex items-center gap-2">
               فرم تماس
            </h2>
            
          </div>

          {/* محتوای فرم */}
          <div className="p-6">
            {submitResult && (
              <div className={`mb-6 p-4 rounded-lg text-right ${
                submitResult.type === 'success' 
                  ? 'bg-green-100 border border-green-300 text-green-800'
                  : 'bg-red-100 border border-red-300 text-red-800'
              }`}>
                {submitResult.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* نام */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-right">
                  نام <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                  placeholder="نام خود را وارد کنید"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500 text-right">{errors.firstName}</p>
                )}
              </div>

              {/* نام خانوادگی */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-right">
                  نام خانوادگی <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500 text-right">{errors.lastName}</p>
                )}
              </div>

              {/* شماره موبایل */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-right">
                  شماره موبایل <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${
                    errors.mobile ? 'border-red-500' : 'border-gray-300'
                  } ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-500 text-right">{errors.mobile}</p>
                )}
              </div>

              {/* ایمیل */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-right">
                  ایمیل <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white'}`}
                  placeholder="example@gmail.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 text-right">{errors.email}</p>
                )}
              </div>

              {/* دکمه ارسال */}
              <div className="flex mt-2 gap-10">
  {/* دکمه ارسال */}
  <button
    type="submit"
    disabled={isSubmitting}
    className={`flex-1 cursor-pointer py-3 rounded-lg font-semibold text-white transition-all ${
      isSubmitting
        ? 'bg-gray-400 cursor-not-allowed'
        : theme === 'dark'
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.01]'
        : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transform hover:scale-[1.01]'
    }`}
  >
    {isSubmitting ? (
      <span className="flex items-center justify-center">
        <svg className="animate-spin h-5 w-5 ml-3 text-white" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        در حال ثبت اطلاعات...
      </span>
    ) : (
      'ارسال اطلاعات'
    )}
  </button>

  {/* دکمه انصراف با رنگ قرمز برای تم لایت و خاکستری برای تم دارک */}
  <button
    onClick={handleClose}
    className={`flex-1 cursor-pointer py-3 rounded-lg font-semibold text-white transition-all ${
      theme === 'dark'
        ? 'bg-red-600 hover:bg-red-700'
        : 'bg-rose-500 hover:bg-rose-600'
    }`}
  >
    انصراف
  </button>
</div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;