import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { dummyBroadcasts } from '@/lib/data/dummy';
import { Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function BroadcastsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold">라이브 방송</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input placeholder="방송 검색..." className="pl-10" />
          </div>
        </div>

        <div className="mb-6 flex gap-2">
          <Badge className="cursor-pointer bg-red-600">LIVE</Badge>
          <Badge variant="outline" className="cursor-pointer">예정</Badge>
          <Badge variant="outline" className="cursor-pointer">종료</Badge>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dummyBroadcasts.map((broadcast) => (
            <Link key={broadcast.broadcastId} href={`/broadcasts/${broadcast.broadcastId}`}>
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src={broadcast.thumbnail}
                    alt={broadcast.title}
                    fill
                    className="object-cover"
                  />
                  {broadcast.status === 'LIVE' ? (
                    <>
                      <Badge className="absolute left-2 top-2 bg-red-600">LIVE</Badge>
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-sm text-white">
                        👁 {broadcast.viewers.toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <Badge className="absolute left-2 top-2" variant="secondary">
                      예정
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-1 font-semibold">{broadcast.title}</h3>
                  <p className="text-sm text-gray-600">{broadcast.host}</p>
                  {broadcast.status === 'SCHEDULED' && (
                    <p className="mt-2 text-xs text-gray-500">
                      {formatDate(broadcast.startTime)}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
