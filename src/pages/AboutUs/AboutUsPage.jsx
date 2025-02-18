import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-96 bg-indigo-600 flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-6 max-w-3xl">
          <h1 className="text-4xl font-bold mt-32">About Delibox</h1>
          <p className="text-xl mt-4">
            Delivering parcels with speed, security, and reliability. Experience
            next-level parcel management with us.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="pt-28 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold">
          Our <span className="underline underline-offset-4">Story</span>
          <span className="text-clr-primary">.</span>
        </h2>
        <p className="mt-12 text-lg leading-relaxed">
          Founded in 2023, Delibox started with a vision to revolutionize parcel
          delivery by making it{' '}
          <span className="font-bold text-xl text-indigo-400">faster</span>,
          <span className="font-bold text-xl text-indigo-400"> safer</span>, and
          <span className="font-bold text-xl text-indigo-400"> smarter</span>.
          Our team works tirelessly to provide seamless experiences, ensuring
          that your deliveries are always on time.
        </p>
      </section>

      {/* Our Team */}
      <section className="py-28 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center">
          Meet Our <span className="underline underline-offset-4">Team</span>
          <span className="text-clr-primary">.</span>
        </h2>
        <p className="text-center mt-12 text-lg leading-relaxed">
          Our dedicated team ensures that Delibox remains the{' '}
          <span className="font-bold text-indigo-400">best</span> parcel
          management platform.
        </p>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {teamMembers.map((member) => (
            <Card
              key={member.name}
              className="shadow-md hover:shadow-lg transition">
              <CardHeader className="flex flex-col items-center">
                <Avatar className="w-24 h-24 border-4 border-clr-primary shadow">
                  <AvatarImage src={member.photo} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{member.name}</CardTitle>
                <p className="text-sm">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold">Join the Delibox Revolution</h2>
        <p className="text-lg mt-4">
          Start using Delibox today and experience seamless parcel delivery.
        </p>
        <Button
          variant="primary"
          className="mt-6 bg-yellow-400 text-indigo-600 hover:bg-yellow-500">
          <Link to={'/login'}>Get Started</Link>
        </Button>
      </section>
    </div>
  );
};

// Team Members Data
const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'CEO & Co-Founder',
    photo: 'https://i.ibb.co.com/wNp41b9F/7hsbnQNV.png',
    bio: 'Alice leads our vision and strategy, ensuring innovation and customer satisfaction.',
  },
  {
    name: 'Michael Smith',
    role: 'Head of Operations',
    photo: 'https://i.ibb.co.com/xb7myjf/LYkZxBpA.png',
    bio: 'Michael oversees logistics, ensuring on-time deliveries with efficiency.',
  },
  {
    name: 'Sophie Williams',
    role: 'Customer Support Lead',
    photo: 'https://i.ibb.co.com/FL8ftz0W/AKosW5ow.png',
    bio: 'Sophie ensures that our customers receive top-notch service and support.',
  },
];

export default AboutUsPage;
