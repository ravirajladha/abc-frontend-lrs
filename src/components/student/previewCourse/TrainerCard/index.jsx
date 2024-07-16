import React from 'react';
import DefaultProfileImage from '@/assets/images/default/student.png';

const index = ({teacher}) => {
  return (
    <div className="card d-block border-0 rounded-lg overflow-hidden p-4 shadow-xss mt-4 bg-lightblue">
      <h2 className="fw-700 font-sm mb-3 mt-1 pl-1 text-primary mb-4">
        Trainer
      </h2>
      <div className="row">
        <div className="col-lg-3 text-center">
          <img src={DefaultProfileImage} alt="" />
          <h4 className="font-xss fw-600 mt-2 mb-3 pl-2 position-relative lh-24">
            {teacher?.name}
          </h4>
        </div>
        <div className="col-lg-9">
          <h4 className="font-xssss fw-600 text-grey-600 pl-2 position-relative lh-24">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus ipsam labore distinctio est eius. Culpa aspernatur ex
            esse consequuntur eos soluta alias libero laboriosam, nostrum illo
            perferendis quam quaerat vel incidunt fugiat. Distinctio ullam,
            facilis, hic consequatur deleniti porro animi et mollitia adipisci
            recusandae molestiae non eius, minima quas iure officiis explicabo
            id. Minima aliquam repellendus non ipsam porro nostrum saepe
            accusantium distinctio quidem officia excepturi eveniet maxime
            voluptates corporis laboriosam aliquid, assumenda placeat vitae enim
            officiis? Voluptate explicabo nisi, animi minima, modi dicta tenetur
            obcaecati soluta optio tempora eaque vel provident. Similique
            debitis ratione, aperiam qui eaque voluptatum fuga.
          </h4>
        </div>
      </div>
    </div>
  );
};

export default index;
