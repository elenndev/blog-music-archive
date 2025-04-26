import Page from "@/app/dashboard/page"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

jest.mock("next-auth", ()=>({
    getServerSession: jest.fn()
}))

jest.mock("next/navigation", ()=>({
    redirect: jest.fn()
}))

jest.mock("@/@components/dashboard/@Dashboard", ()=>({
    _esModule: true,
    default: ()=> <p>Mocked Dashboard</p>
}))
jest.mock("@/@components/ButtonLogout", ()=>({
    _esModule: true,
    default: ()=> <p>Mocked Button</p>
}))

describe("dashboard-page", ()=>{
    it("redireciona para login quando session==null", async ()=>{
        (getServerSession as jest.Mock).mockResolvedValue(null)

        await Page()

        expect(redirect).toHaveBeenCalledWith('/login')
    })
})