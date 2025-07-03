import { Member } from '@/constants/data';
import { fetchMembers } from '@/lib/api/member';
import { searchParamsCache } from '@/lib/searchparams';
import { MemberTable } from './member-table';
import { columns } from './member-table/columns';

type MemberListingPage = {};

export default async function MemberListingPage({}: MemberListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: Array.isArray(categories) ? categories : [categories] })
  };

  const data = await fetchMembers(filters);
  const totalMembers = 1;
  const Members: Member[] = data;

  return (
    <MemberTable
      data={Members}
      totalItems={totalMembers}
      columns={columns}
    />
  );
}