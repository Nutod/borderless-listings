// SUCCESSFUL Login will redirect to the admin page
// Otherwise, display the toast component
export async function delay ( delay = 3000 ) {
  return new Promise( resolve => {
    window.setTimeout( () => resolve(), delay );
  } );
}
