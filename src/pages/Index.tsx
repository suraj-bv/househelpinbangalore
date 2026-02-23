import { SprayCan, Flame, CookingPot, Bath, ShieldCheck, DollarSign, CalendarCheck, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedSection from "@/components/AnimatedSection";
import FAQItem from "@/components/FAQItem";
import { testimonials, type Testimonial } from "@/data/testimonials";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const services = [
  { icon: SprayCan, title: "Daily Home Cleaning", description: "Sweeping, mopping, dusting furniture, cleaning tables, and basic room tidying." },
  { icon: CookingPot, title: "Kitchen & Dishwashing", description: "Washing dishes, wiping kitchen slabs and sinks, cleaning stove surfaces and general upkeep." },
  { icon: Bath, title: "Laundry Assistance", description: "Washing clothes in machine, drying, and folding clean laundry. (No hand washing)" },
  { icon: Flame, title: "Packing & Unpacking", description: "Organizing items during shifting, unpacking essentials, arranging clothes and household items." },
];

const features = [
  { icon: DollarSign, title: "Fixed Hourly Pricing", description: "One clear rate per hour with no hidden charges or surprises." },
  { icon: CalendarCheck, title: "Instant Availability", description: "Trained maids available for quick bookings – 1 to 2 hour slots only." },
  { icon: ThumbsUp, title: "No Long-term Commitment", description: "Book only when required. Ideal for light, daily chores." },
  { icon: ShieldCheck, title: "Trained & Verified", description: "Hygiene standards and task checklists followed by all our maids." },
];

const Index = () => {
  // Real-time blog posts from Convex
  const blogPosts = useQuery(api.blogPosts.getAll);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="House Help in Bangalore | Instant Maid Services | 1-2 Hour Slots"
        description="Get instant house help in Bangalore. Book trained & verified maids for 1-2 hours for daily cleaning, dishwashing, laundry, and packing. Fixed hourly pricing, no long-term commitment."
        canonicalPath="/"
        keywords="house help bangalore, maid service bangalore, hourly maid bangalore, cleaning service bangalore, home cleaning bangalore, dishwashing service, laundry help bangalore, instant maid booking"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[75vh] overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#394E9B]/90 via-[#394E9B]/75 to-[#5a73d4]/80" />
        
        <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 sm:px-5 sm:py-2 shadow-lg" style={{ backgroundColor: '#394E9B' }}>
            <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold text-white">Instant Maid Services in Bangalore</span>
          </div>
          
          <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-white drop-shadow-2xl sm:text-5xl lg:text-7xl text-balance">
            Quick Home Help,<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Fixed Hourly Pricing
            </span>
          </h1>
          
          <p className="mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg lg:text-xl text-white/95 drop-shadow-md font-medium leading-relaxed px-2">
            Need quick help at home but don't want the hassle of hiring a full-time maid? Get <strong>instant maid services</strong> for 1-2 hours only – basic cleaning, dishwashing, laundry, or packing support.
          </p>
          
          {/* App Download Badges */}
          <div className="mt-8 sm:mt-10">
            <p className="text-white text-base sm:text-lg mb-4 sm:mb-5 font-semibold">Our application will soon be available on these platforms.</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Get it on Google Play" 
                className="h-12 sm:h-14 lg:h-16 hover-scale cursor-pointer drop-shadow-2xl" 
              />
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store" 
                className="h-12 sm:h-14 lg:h-16 hover-scale cursor-pointer drop-shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <AnimatedSection className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading title="What Our Hourly Maid Service Includes" subtitle="Our service is meant for basic home help, not heavy-duty or deep cleaning." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </AnimatedSection>

      {/* Detailed Service Breakdown */}
      <AnimatedSection className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
        
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-16 text-center">
            <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-primary">What We Offer</span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text">
              Service Details
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Here's exactly what our trained maids will help you with during your 1-2 hour booking.
            </p>
          </div>
          
          {/* First Row - 3 Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Daily Home Cleaning */}
            <div className="group relative glossy-card border-transparent p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary group-hover:to-accent">
                  <SprayCan className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-5 transition-colors duration-300 group-hover:text-primary">Daily Home Cleaning</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Sweeping and mopping floors</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Dusting furniture and surfaces</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Cleaning tables and common areas</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Basic room tidying</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Kitchen Cleaning + Dishwashing */}
            <div className="group relative glossy-card border-transparent p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary group-hover:to-accent">
                  <CookingPot className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-5 transition-colors duration-300 group-hover:text-primary">Kitchen & Dishwashing</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Washing dishes and utensils</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Wiping kitchen slabs and sinks</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Cleaning stove surfaces (basic wipe)</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">General kitchen upkeep</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Laundry Assistance */}
            <div className="group relative glossy-card border-transparent p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary group-hover:to-accent">
                  <Bath className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-5 transition-colors duration-300 group-hover:text-primary">Laundry Assistance</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Washing clothes in machine</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Drying clothes</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Folding clean laundry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - 2 Cards Centered */}
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
            {/* Packing & Unpacking */}
            <div className="group relative glossy-card border-transparent p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary group-hover:to-accent">
                  <Flame className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-5 transition-colors duration-300 group-hover:text-primary">Packing & Unpacking Help</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Packing items during shifting</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Unpacking and organizing essentials</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Arranging clothes and utensils</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Basic household item organization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bathroom & Utility */}
            <div className="group relative glossy-card border-transparent p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 p-4 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary group-hover:to-accent">
                  <ShieldCheck className="h-8 w-8 text-primary transition-colors duration-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-5 transition-colors duration-300 group-hover:text-primary">Bathroom & Utility Cleaning (Basic)</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Cleaning toilet seats and sinks</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Bathroom floor cleaning</span>
                  </div>
                  <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                    </div>
                    <span className="text-sm text-foreground/80 leading-relaxed">Utility or wash area cleaning</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* What's NOT Included */}
      <AnimatedSection className="mx-auto max-w-6xl px-4 py-12 sm:py-20 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <span className="mb-2 sm:mb-3 inline-block rounded-full bg-red-50 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-red-600">Important Information</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 px-2">What's NOT Included</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">To keep expectations clear, here's what our hourly maid support does not cover:</p>
        </div>
        
        <div className="glossy-card border-transparent p-5 sm:p-8 md:p-10 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">Deep cleaning / intensive scrubbing</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Heavy-duty cleaning requires separate service</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">Heavy grease removal</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Only basic kitchen wipe-downs included</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">Bathroom descaling</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Basic bathroom cleaning only</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">Post-renovation cleaning</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Requires specialized equipment</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">Cooking or food preparation</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Cleaning tasks only</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-foreground mb-1">Machine-based deep cleaning</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">Manual cleaning methods only</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-3 sm:p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-xs sm:text-sm text-center text-foreground/80">
              <strong>Need deep cleaning?</strong> Contact us through the app and we can suggest the right service for intensive cleaning needs.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection className="bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading title="Why Choose Us for Maid Services?" subtitle="Fixed pricing, instant availability, and complete transparency – that's our promise." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="group flex flex-col items-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:from-primary group-hover:to-accent group-hover:text-white">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>


      {/* Blog */}
      <AnimatedSection className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">From Our Blog</span>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Tips & insights for a spotless home</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">Cleaning guides, eco-friendly tips, and expert advice to help you keep your space fresh.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(blogPosts || []).slice(0, 3).map((post) => (
              <BlogCard
                key={post._id}
                id={post._id}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                date={post.date}
                content={post.content}
                createdAt={post.createdAt}
              />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" asChild className="rounded-full px-8">
              <Link to="/blogs">View All Articles</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading title="What Our Clients Say" subtitle="Real stories from real, happy customers." />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t: Testimonial) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to know about our hourly maid services in Bangalore.</p>
        </div>
        
        <div className="space-y-4">
          <FAQItem
            question="How do I book a maid service?"
            answer="Download our mobile app from Google Play Store or Apple App Store. Booking is only available through the app. You can book instantly or schedule for a later time."
          />
          
          <FAQItem
            question="What areas in Bangalore do you serve?"
            answer="We provide maid services across major areas and localities in Bangalore. Check the app for availability in your specific location."
          />
          
          <FAQItem
            question="What is the duration of service?"
            answer="Our service is available in 1-hour or 2-hour slots only. This is ideal for daily household chores and basic cleaning tasks."
          />
          
          <FAQItem
            question="What is the pricing model?"
            answer="We have a fixed hourly pricing model with complete transparency. The rate per hour is clearly mentioned in the app with no hidden charges or surprises."
          />
          
          <FAQItem
            question="Do I need to commit to monthly or long-term service?"
            answer="No! There's no long-term commitment required. Book only when you need help – whether it's a one-time service or regular bookings, it's completely up to you."
          />
          
          <FAQItem
            question="What tasks are included in the service?"
            answer="Our maids handle daily home cleaning (sweeping, mopping, dusting), kitchen cleaning and dishwashing, laundry assistance (machine washing only), packing/unpacking help, and basic bathroom cleaning."
          />
          
          <FAQItem
            question="What services are NOT included?"
            answer="Deep cleaning, intensive scrubbing, heavy grease removal, bathroom descaling, post-renovation cleaning, cooking or food preparation, and machine-based deep cleaning are not included in our hourly service."
          />
          
          <FAQItem
            question="Are the maids verified and trained?"
            answer="Yes, all our maids are background-verified, trained in hygiene standards, and follow proper task checklists to ensure quality service."
          />
          
          <FAQItem
            question="Can I get same-day or instant service?"
            answer="Yes! We offer instant booking where trained maids can be available for quick bookings, subject to availability in your area."
          />
          
          <FAQItem
            question="What if I need deep cleaning services?"
            answer="For deep cleaning or intensive cleaning requirements, please contact us through the app and we can suggest the right specialized service for your needs."
          />
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default Index;
