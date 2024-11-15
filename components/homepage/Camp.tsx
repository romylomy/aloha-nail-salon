import { PEOPLE_URL } from "@/constants";
import Image from "next/image";

interface CampProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const CampSite = ({ backgroundImage, title, subtitle, peopleJoined }: CampProps) => {
  return (
    <div
      className={`h-full w-full sm:min-w-[320px] min-w-[1100px] ${backgroundImage} bg-cover sm:bg-contain lg:bg-cover bg-no-repeat lg:rounded-r-5xl 2xl:rounded-5xl`}
    >
      <div className="flex h-full flex-col items-start justify-between p-4 sm:p-2 lg:px-20 lg:py-10 sm:gap-2 gap-6">
        <div className="flexCenter sm:gap-2 gap-4">
          <div className="rounded-full bg-green-50 p-3 sm:p-2">
            <Image
              src="/folded-map.svg"
              alt="map"
              width={24}
              height={24}
              className="object-contain sm:w-6 sm:h-6"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="bold-18 text-white lg:text-lg sm:text-sm">{title}</h4>
            <p className="regular-14 text-white sm:text-xs">{subtitle}</p>
          </div>
        </div>

        <div className="flexCenter sm:gap-2 gap-6">
          <span className="flex -space-x-4 overflow-hidden">
            {PEOPLE_URL.map((url) => (
              <Image
                className="inline-block h-10 w-10 rounded-full object-cover sm:h-8 sm:w-8 lg:h-10 lg:w-10"
                src={url}
                key={url}
                alt="person"
                width={52}
                height={52}
              />
            ))}
          </span>
          <p className="bold-16 md:bold-20 text-white sm:text-sm">{peopleJoined}</p>
        </div>
      </div>
    </div>
  );
};

const Camp = () => {
  return (
    <section className="2xl:max-container relative flex flex-col py-6 sm:py-4 lg:mb-10 lg:py-20 xl:mb-20">
      <div className="hide-scrollbar flex h-[280px] sm:h-[240px] w-full items-start justify-start sm:gap-2 gap-8 overflow-x-auto lg:h-[400px] xl:h-[640px]">
        <CampSite
          backgroundImage="bg-bg-img-1"
          title="Acrylic Nails"
          subtitle="Prigen, Pasuruan"
          peopleJoined="50+ Joined"
        />
        <CampSite
          backgroundImage="bg-bg-img-2"
          title="Dip powder"
          subtitle="Somewhere in the Wilderness"
          peopleJoined="50+ Joined"
        />
          <CampSite
          backgroundImage="bg-bg-img-3"
          title="Gel"
          subtitle="Somewhere in the Wilderness"
          peopleJoined="50+ Joined"
        />
      
      </div>
    </section>
  );
};

export default Camp;
