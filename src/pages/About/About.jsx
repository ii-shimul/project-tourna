import React from "react";

export default function About() {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About <span className="text-black">Tourna</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-80 mb-8">
              The ultimate platform for organizing and managing tournaments with
              ease
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="badge badge-outline badge-lg">
                Single Elimination
              </div>
              <div className="badge badge-outline badge-lg">
                Team Management
              </div>
              <div className="badge badge-outline badge-lg">
                Real-time Updates
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            We believe that organizing tournaments should be simple, efficient,
            and enjoyable. Tourna was created to eliminate the complexity of
            tournament management, allowing organizers to focus on what matters
            most - creating memorable competitive experiences for participants
            and spectators alike.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="card-title justify-center">
                  Single Elimination
                </h3>
                <p className="opacity-70">
                  Classic tournament format with automatic bracket generation
                  and progression tracking.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="card-title justify-center">Team Management</h3>
                <p className="opacity-70">
                  Create and manage teams with member details, captains, and
                  comprehensive team information.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="card-title justify-center">Real-time Updates</h3>
                <p className="opacity-70">
                  Live bracket updates as matches progress, keeping everyone
                  informed of the current standings.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="card-title justify-center">
                  Tournament Analytics
                </h3>
                <p className="opacity-70">
                  Track tournament progress, match statistics, and team
                  performance metrics.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="card-title justify-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3>Easy Management</h3>
                </div>
                <p className="opacity-70">
                  Intuitive interface for tournament organizers to set up and
                  manage events effortlessly.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="card-title justify-center">Responsive Design</h3>
                <p className="opacity-70">
                  Access and manage tournaments from any device with our
                  mobile-friendly interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Teams</h3>
            <p className="opacity-70">
              Set up your teams with member details and captain information.
              Organize your participants efficiently.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-3">Setup Tournament</h3>
            <p className="opacity-70">
              Create your tournament, select participating teams, and choose
              your preferred format.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-3">Manage Matches</h3>
            <p className="opacity-70">
              Track match results, advance winners, and watch your tournament
              unfold in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Team
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="avatar placeholder mb-4 mx-auto">
                  <div className="bg-black text-white place-content-center rounded-full w-24">
                    <span className="text-3xl">👨‍💻</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Development Team</h3>
                <p className="opacity-70 mb-4">
                  Passionate developers dedicated to creating the best
                  tournament management experience.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="badge badge-outline">React</div>
                  <div className="badge badge-outline">Node.js</div>
                  <div className="badge badge-outline">MySQL</div>
                  <div className="badge badge-outline">Tailwind CSS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get In Touch
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="opacity-70">support@tourna.com</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="font-semibold mb-2">Support</h3>
                  <p className="opacity-70">24/7 Help Center</p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="text-center">
                <p className="opacity-70 mb-4">
                  Have questions or feedback? We'd love to hear from you!
                </p>
                <button className="btn bg-black text-white">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Tournament?
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Join thousands of organizers who trust Tourna for their tournament
            management needs.
          </p>
          <button className="btn bg-white text-black btn-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}
