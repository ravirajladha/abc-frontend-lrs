import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const classesList = [
  {
    imageUrl: 'english.jpg',
    title: 'Bootstrap',
    num: '32 Course',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'english.jpg',
    title: 'HTML',
    num: '54 Course',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'english.jpg',
    title: 'Jquery',
    num: '76 Course',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'english.jpg',
    title: 'SASS',
    num: '76 Course',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'english.jpg',
    title: 'React',
    num: '23 Course',
    bg: '#fff9eb',
  },

  {
    imageUrl: 'english.jpg',
    title: 'JAVA',
    num: '78 Course',
    bg: '#fff9eb',
  },
  {
    imageUrl: 'english.jpg',
    title: 'Python',
    num: '65 Course',
    bg: '#fff9eb',
  },
];

function MiniProjectSlider() {
  const categorysettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 300,
    centerMode: false,
    variableWidth: true,
  };

  return (
    <div className="py-4">
      <Slider {...categorysettings} className="slick-container">
        {classesList.map((value, index) => (
          <div
            key={index}
            className="card cat-card-hover mr-3 w140 border-0 p-0 text-center slick-slide"
          >
            <div
              className="card-body p-4 ml-0 rounded-lg"
              style={{ background: `${value.bg}` }}
            >
              <a href="/" className="btn-round-xl bg-white">
                <img
                  src={`/assets/images/subjects/${value.imageUrl}`}
                  alt="icon"
                  className="p-2 w-100"
                />
              </a>
              <h4 className="fw-600 font-xsss mt-3 mb-0">
                {value.title}
                <span className="d-block font-xsssss fw-500 text-grey-500 mt-2">
                  {value.num}
                </span>
              </h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MiniProjectSlider;
