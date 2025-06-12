'use client';

import Bar from '@/components/Bar';
import LinkModal from '@/components/modal/LinkModal';

const Demarrage = () => {

  return (
    <>
        <Bar icon="Info" title="Démarrage" color="#F9F7F7" noBack />
        <div className="view">
            <div className="thread">
                <span className="sm-text">
                    Démarrage de l'application.
                </span>

                <div className='content'>

                    <span className="md-text">
                        Sitomnia est une application qui permet de suivre et organiser votre quotidien en tant que sénior.
                        Elle vous aide à gérer votre quotidien grâce à un agenda, un carnet de notes, un assistant personnel intelligent.
                        Vous retrouverez aussi des informations préventives concernant la santé et la vie quotidienne.
                    </span>
                </div>
            </div>
        </div>

        <LinkModal icon="Check" title="Continuer" link="/connexion" />
    </>
  );
};

export default Demarrage;