import {
  PaperPlaneIcon,
  RocketIcon,
  EnvelopeOpenIcon,
  GlobeIcon,
} from '@radix-ui/react-icons';
export default function IconBottom() {
  return (
    <div className="container mx-28 my-10 flex justify-around">
      <div>
        <PaperPlaneIcon className="h-10 w-10" />
      </div>
      <div>
        <RocketIcon className="h-10 w-10" />
      </div>

      <div>
        <EnvelopeOpenIcon className="h-10 w-10" />
      </div>
      <div>
        <GlobeIcon className="h-10 w-10" />
      </div>
    </div>
  );
}
