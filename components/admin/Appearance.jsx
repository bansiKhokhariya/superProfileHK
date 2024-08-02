import React from 'react';
import toast from 'react-hot-toast';

const themes = [
  { name: "Light", palette: ["rgb(255, 255, 255)", "rgb(242, 242, 242)", "rgb(31, 41, 55)", "rgb(97, 112, 248)"] },
  { name: "Dark", palette: ["rgb(42, 48, 60)", "rgb(36, 41, 51)", "rgb(166, 173, 187)", "rgb(109, 104, 230)"] },
  { name: "Winter", palette: ["rgb(10, 120, 250)", "rgb(71, 71, 161)", "rgb(255, 255, 255)", "rgb(2, 20, 49)"] },
  { name: "Cymk", palette: ["rgb(68, 173, 237)", "rgb(233, 82, 140)", "rgb(255, 236, 58)", "rgb(26, 26, 26)"] },
  { name: "Emerald", palette: ["rgb(255, 255, 255)", "rgb(230, 229, 230)", "rgb(51, 60, 77)", "rgb(102, 204, 138)"] },
  { name: "Dracula", palette: ["rgb(40, 42, 54)", "rgb(36, 38, 49)", "rgb(248, 248, 242)", "rgb(244, 119, 197)"] },
  { name: "valentine", palette: ["rgb(233, 109, 123)", "rgb(170, 146, 247)", "rgb(136, 220, 221)", "rgb(175, 70, 112)"] },
  { name: "Synthwave", palette: ["rgb(47, 44, 105)", "rgb(43, 39, 95)", "rgb(249, 247, 253)", "rgb(231, 121, 193)"] },
  { name: "Aqua", palette: ["rgb(52, 93, 167)", "rgb(46, 84, 150)", "rgb(197, 217, 253)", "rgb(77, 237, 244)"] },
  { name: "Bumblebee", palette: ["rgb(242, 242, 242)", "rgb(230, 229, 230)", "rgb(51, 51, 51)", "rgb(224, 168, 52)"] },
  { name: "Cyberpunk", palette: ["rgb(242, 226, 55)", "rgb(229, 215, 51)", "rgb(51, 48, 5)", "rgb(245, 115, 151)"] },
  { name: "Black", palette: ["rgb(0, 0, 0)", "rgb(13, 13, 13)", "rgb(204, 204, 204)", "rgb(52, 50, 50)"] },
  { name: "Lemonade", palette: ["rgb(230, 229, 230)", "rgb(255, 255, 255)", "rgb(81, 153, 3)", "rgb(51, 51, 51)"] },
  { name: "Coffee", palette: ["rgb(32, 22, 31)", "rgb(29, 20, 28)", "rgb(117, 110, 99)", "rgb(219, 146, 75)"] },
  { name: "Forest", palette: ["rgb(23, 18, 18)", "rgb(21, 16, 16)", "rgb(214, 203, 203)", "rgb(74, 184, 85)"] },
];

const Appearance = ({ formData, setFormData }) => {

  const handleThemeSelect = (theme) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, themePalette: theme };
      handleUpdate(updatedData);
      return updatedData;
    });
  };

  const handleButtonSelect = (buttonStyle) => {
    setFormData((prevData) => {
      const updatedData = { ...prevData, buttonStyle };
      handleUpdate(updatedData);
      return updatedData;
    });
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: updatedData.id,
          themePalette: updatedData.themePalette,
          buttonStyle: updatedData.buttonStyle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error in handleUpdate:', error);
      toast.error('Error updating profile.');
    }
  };

  return (
    <>
      <div className='bg-white p-5 rounded-xl'>
        <h1 className="text-2xl font-bold mb-5">Themes</h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xxl:grid-cols-4 gap-2">
          {themes.map((theme, index) => (
            <div
              key={index}
              className={`cursor-pointer p-4 border rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out flex flex-col gap-2 items-center justify-center
              ${formData?.themePalette?.name === theme.name ? 'border-indigo-500' : 'border-gray-300'}
            `}
              onClick={() => handleThemeSelect(theme)}
            >
              <span className="text-sm font-bold ">{theme.name}</span>
              <div className="flex gap-1">
                {theme.palette.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    style={{ background: color }}
                    className="w-5 h-16 border sm:w-8 sm:h-20"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-5 bg-white p-5 rounded-xl'>
        <h1 className="text-2xl font-bold mb-5">Button</h1>
        <div className='flex flex-col gap-2'>
          <p className='text-lg' >Fill</p>
          <div className="grid grid-cols-3 gap-4">
            <div className={`cursor-pointer p-1 ${formData?.buttonStyle === 'normal' ? 'border border-indigo-500' : ''}`}>
              <div className={`border py-4 bg-black`} onClick={() => handleButtonSelect('normal')}></div>
            </div>
            <div className={`cursor-pointer p-1 ${formData?.buttonStyle === 'rounded-md' ? 'border border-indigo-500' : ''}`}>
              <div className={`border py-4 bg-black rounded-md`} onClick={() => handleButtonSelect('rounded-md')}></div>
            </div>
            <div className={`cursor-pointer p-1 ${formData?.buttonStyle === 'rounded-full' ? 'border border-indigo-500' : ''}`}>
              <div className={`border py-4 bg-black rounded-full`} onClick={() => handleButtonSelect('rounded-full')}></div>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 mt-4'>
          <p className='text-lg' >Hard shadow</p>
          <div className="grid grid-cols-3 gap-4">

            <div className={`cursor-pointer pb-2 pt-1 px-2 ${formData?.buttonStyle === 'shadow' ? 'border border-indigo-500' : ''}`}>
              <div style={{ boxShadow: "5px 5px" }} className={`border py-4`} onClick={() => handleButtonSelect('shadow')}></div>
            </div>

            <div className={`cursor-pointer pb-2 pt-1 px-2 ${formData?.buttonStyle === 'shadow-rounded' ? 'border border-indigo-500' : ''}`}>
              <div style={{ boxShadow: "5px 5px" }} className={`border  py-4 rounded-md`} onClick={() => handleButtonSelect('shadow-rounded')}></div>
            </div>

            <div className={`cursor-pointer pb-2 pt-1 px-2 ${formData?.buttonStyle === 'shadow-rounded-full' ? 'border border-indigo-500' : ''}`}>
              <div style={{ boxShadow: "5px 5px" }} className={`border  py-4 rounded-full`} onClick={() => handleUpdate('shadow-rounded-full')}></div>
            </div>
          </div>
        </div>

      </div>
    </>



  );

};

export default Appearance;
