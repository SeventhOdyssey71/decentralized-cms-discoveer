import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageCircle, Bookmark, MoreHorizontal, Play, Share } from "lucide-react"

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="text-2xl font-bold">
              Discoveer
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                Write
              </Button>
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-2">
            <div className="sticky top-24 space-y-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Sharing Science</span>
                <p className="text-xs text-gray-500 text-center">
                  Observations and analysis from scientists on biology, health, and how we live and interact with our
                  natural world.
                </p>
                <Button variant="outline" size="sm" className="text-xs">
                  Follow publication
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-8">
            {/* Member-only banner */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium">Member-only story</span>
              </div>
              <p className="text-sm text-gray-600">
                This member-only story is on us.{" "}
                <Link href="/pricing" className="underline">
                  Upgrade to access all of Discoveer.
                </Link>
              </p>
            </div>

            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Creatine is Overrated</h1>
              <p className="text-xl text-gray-600 mb-6">
                But that's ok. The supplement's modest benefits are exactly what makes it so great.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Brady Holmer</span>
                      <Button variant="outline" size="sm" className="text-xs rounded-full">
                        Follow
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>8 min read</span>
                      <span>•</span>
                      <span>May 10, 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between py-4 border-y border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <Star className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">417</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">15</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose max-w-none mb-12">
              <div className="mb-8">
                <div className="w-full h-64 bg-gray-200 rounded-lg mb-4"></div>
              </div>

              <div className="text-lg leading-relaxed space-y-6">
                <p className="text-2xl font-bold">
                  <span className="text-6xl float-left mr-2 leading-none">F</span>
                  ull disclosure: I take creatine. 5 grams. Every day. And I think you should too.
                </p>

                <p>
                  That said, the health and fitness space is massively overselling its benefits. Creatine isn't as
                  miraculous as it's purported to be — but that's ok. Why?
                </p>

                <p className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  Unlike most supplements, creatine seems to be a "free lunch." What I mean by that is we get some
                  benefits (which I'll discuss later) with apparently zero downside — there are no established harmful
                  side effects of creatine supplementation. That's a good thing, but it also means we shouldn't be
                  surprised that its benefits <strong>aren't that large</strong>. Most performance enhancers come with
                  downsides: Too much caffeine makes you anxious and builds a tolerance, anabolic steroids come with a
                  plethora of hormonal effects, and even overdosing on carbs can give you stomach issues. But when used
                  correctly these ergogenic aids can also massively enhance physical and cognitive performance.
                </p>

                <p>
                  With creatine, chronic, high-dose supplementation appears to be safe, beneficial, and well-tolerated.
                  In fact,{" "}
                  <strong>
                    higher doses appear to be necessary for some of the benefits on certain aspects of health
                  </strong>{" "}
                  (brain and bone). More is better to some degree.
                </p>

                <p>
                  Unfortunately, the ease with which the health sphere has (errantly) attributed miraculous properties
                  to creatine is pretty astounding. I've seen claims that it'll help reduce cancer risk, cure
                  depression, boost immune system health, and enhance fertility. It's easy enough to make this logical
                  (and mechanistic) leap given that nearly all cells and tissues in the body use creatine to produce
                  energy. Unfortunately, there's no evidence (yet) to support many of these claims.
                </p>
              </div>
            </div>

            {/* Author Info */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Published in Sharing Science</CardTitle>
                    <p className="text-sm text-gray-600">2.2K followers • Last published 10 hours ago</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Observations and analysis from scientists on biology, health, and how we live and interact with
                      our natural world.
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-full">
                    Follow
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">Written by Brady Holmer</CardTitle>
                    <p className="text-sm text-gray-600">752 followers • 112 following</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Science writer and communicator — M.Sc. in Human Performance and Endurance Athlete
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full">
                      Follow
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Responses Section */}
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                Responses (15)
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </h3>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    S
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="What are your thoughts?"
                      className="w-full p-3 border border-gray-200 rounded-lg resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm">Mike Murray</span>
                        <span className="text-xs text-gray-500">May 16 (edited)</span>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm">
                          Last but certainly not least is the fact that creatine supplementation does absolutely nothing
                          for muscle mass and muscle strength if you don't also combine it with resistance exercise ...
                        </p>
                      </div>
                      <p className="text-sm mt-2">
                        I wouldn't say absolutely. I was suffering from thigh muscle atrophy and spasms, mainly as a
                        consequence of a nasty flu infection. Even though I was improving very slowly, my muscles seemed
                        stuck in a catabolic state. I
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-2">
            <div className="sticky top-24">
              {/* More articles */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm">More from Brady Holmer and Sharing Science</h4>

                <div className="space-y-4">
                  <div>
                    <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-xs text-gray-600">In Runner's Life by Brady Holmer</span>
                    </div>
                    <h5 className="text-sm font-medium mb-1">
                      What 2 Hours of Running Does to Your Physiology; Breath Training...
                    </h5>
                    <p className="text-xs text-gray-500 mb-2">
                      Cooling your hands leads to better performance; Men and women respond to...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>6d ago</span>
                      <span>308</span>
                      <span>4</span>
                    </div>
                  </div>

                  <div>
                    <div className="w-full h-20 bg-gray-200 rounded mb-2"></div>
                    <div className="flex items-center gap-1 mb-1">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">In Sharing Science by Sam Westreich, PhD</span>
                    </div>
                    <h5 className="text-sm font-medium mb-1">Why Can't We Sleep With Contact Lenses?</h5>
                    <p className="text-xs text-gray-500 mb-2">
                      It's not just scratchy eyes—this adds a huge risk from certain bacteria.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>May 5</span>
                      <span>337</span>
                      <span>11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
