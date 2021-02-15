import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import useQueryListings from 'hooks/useQueryListings';
import { delay } from 'utils/delay';
import useMutateListings from 'hooks/useMutateListings';
import { customStyles } from '../pages/AdminListing';

export function DeleteListing ( { deleteListingModalOpen, closeDeleteListingModal } ) {
  const { id } = useParams();
  const [loading, setLoading] = React.useState( false );
  const history = useHistory();
  const listings = useQueryListings();
  const setListings = useMutateListings();

  const deleteListing = async () => {
    setLoading( true );
    // eslint-disable-next-line eqeqeq
    const filteredListings = listings.filter( listing => listing.id != id );

    if ( listings.length > filteredListings.length ) {
      setListings( filteredListings );

      await delay();
      setLoading( false );
      // close the modal
      closeDeleteListingModal();
      await delay();
      toast.success( `Listing ${id} was removed` );
      await delay();
      history.push( '/admin/listings' );
    } else {
      await delay();
      // close the modal
      closeDeleteListingModal();
      toast.error( `Listing ${id} was removed` );
    }
  };

  return (
    <Modal
      isOpen={deleteListingModalOpen}
      style={customStyles}
      onRequestClose={closeDeleteListingModal}
    >
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto text-center">
          <div className="">
            <p className="leading-relaxed text-base">
              This action will remove this listing. Do you wish to continue?
            </p>
            <div className="flex md:mt-4 mt-6 justify-center">
              <button
                onClick={deleteListing}
                disabled={loading}
                className={`inline-flex text-white bg-red-700 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded ${loading && 'pointer-events-none opacity-50'}`}
              >
                {loading ? 'Please wait' : 'Proceed'}
              </button>
              <button
                onClick={closeDeleteListingModal}
                className="ml-4 text-red-700 inline-flex items-center focus:outline-none"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}
