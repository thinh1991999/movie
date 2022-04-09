import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function PeopleSocial({ peopleExternal }) {
  return (
    <div className="mb-5 flex items-center">
      {peopleExternal?.facebook_id && (
        <a
          href={`https://www.facebook.com/${peopleExternal?.facebook_id}`}
          className="text-3xl mr-4 hover:text-blue-600 transition-all duration-300 ease-linear"
          target="_blank"
        >
          <BsFacebook />
        </a>
      )}
      {peopleExternal?.instagram_id && (
        <a
          href={`https://www.instagram.com/${peopleExternal?.instagram_id}`}
          className="text-3xl mr-4 hover:text-blue-600 transition-all duration-300 ease-linear"
          target="_blank"
        >
          <BsInstagram />
        </a>
      )}
      {peopleExternal?.twitter_id && (
        <a
          href={`https://twitter.com/${peopleExternal?.twitter_id}`}
          className="text-3xl mr-4 hover:text-blue-600 transition-all duration-300 ease-linear"
          target="_blank"
        >
          <BsTwitter />
        </a>
      )}
    </div>
  );
}

export default PeopleSocial;
