export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/status',
      permanent: false,
    },
  };
}

export default function RedirectPage() {
  return null;
}
