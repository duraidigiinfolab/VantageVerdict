'use client';

import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, BookmarkPlus, Copy, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatNumber } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface PostEngagementProps {
  postId: string;
  initialLikeCount: number;
  commentCount: number;
}

export default function PostEngagement({ postId, initialLikeCount, commentCount }: PostEngagementProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkLikeStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const { data } = await supabase
          .from('likes')
          .select('id')
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .single();
        
        if (data) setIsLiked(true);
      }
    };
    checkLikeStatus();
  }, [postId, supabase]);

  const handleLike = async () => {
    if (!userId) {
      router.push('/auth/login');
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (isLiked) {
        await supabase.from('likes').delete().eq('post_id', postId).eq('user_id', userId);
        setLikeCount(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      } else {
        await supabase.from('likes').insert({ post_id: postId, user_id: userId });
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
      router.refresh(); // Refresh server component data
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="engagement-bar">
      <div className="engagement-left">
        <button 
          className="engagement-btn" 
          id="like-btn" 
          onClick={handleLike}
          style={{ color: isLiked ? 'var(--color-primary)' : 'inherit' }}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} /> 
          {formatNumber(likeCount)} Likes
        </button>
        <button 
          className="engagement-btn" 
          id="comment-jump-btn"
          onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MessageCircle size={16} /> {commentCount} Comments
        </button>
        <button className="engagement-btn" id="bookmark-btn">
          <BookmarkPlus size={16} /> Save
        </button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="engagement-btn" title="Copy link" id="share-copy-btn" onClick={handleCopyLink}>
          <Copy size={14} />
        </button>
        <button className="engagement-btn" title="Share on Twitter" id="share-twitter-btn" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank')}>
          <Globe size={14} />
        </button>
      </div>
    </div>
  );
}
