 

export default function ContactPage() {
  return (
    <>
    
    <div className="min-h-screen bg-white ">
       
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">
          Contact Us
        </h1>

        <p className="  text-center mb-10">
          Have questions about an event, partnership, or collaboration? Reach out to us using the form below or through our contact information.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-green-400 font-semibold text-xl mb-1">📍 Address</h3>
              <p className=" ">123 Event Street, Bangalore, India</p>
            </div>

            <div>
              <h3 className="text-green-400 font-semibold text-xl mb-1">📞 Phone</h3>
              <p className=" ">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="text-green-400 font-semibold text-xl mb-1">✉️ Email</h3>
              <p className=" ">contact@eventorganizer.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white text-black p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                placeholder="Your Message"
                className="w-full border border-gray-300 px-4 py-2 rounded h-28 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
