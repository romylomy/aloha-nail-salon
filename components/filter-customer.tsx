'use client'

import React  from 'react'
import { Button, Input, Select} from 'antd'
import { useRouter } from 'next/navigation'




function FilterCustomer() {

    const [name,setName] = React.useState("")
    const [phone, setPhone] = React.useState("")
    const router = useRouter();

    const onFilter = () =>{
        router.push(`/admin/customers?name=${name}&phone=${phone}`)
    }

    const onClearFilters = () =>{
        setName("")
        setPhone("")
        router.push("/admin/customers")
    }


    return (
        <div className="grid lg:grid-cols-4 gap-5 items-end py-8">
        <div className="flex flex-col">
          <label htmlFor="Search" className="text-sm">
            Name
          </label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
  
        <div className="flex flex-col">
          <label htmlFor="phone" className="text-sm">
            Phone
          </label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
  
        <div className="flex justify-end gap-5">
          <Button onClick={onClearFilters}>Clear Filters</Button>
          <Button type="primary" onClick={onFilter}>
            Apply Filters
          </Button>
        </div>
      </div>
    );
  }

export default FilterCustomer