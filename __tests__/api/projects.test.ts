import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { prisma } from '@/lib/prisma'
import { GET, POST } from '@/app/api/projects/route'
import { PATCH, DELETE } from '@/app/api/projects/[id]/route'

describe('Projects API', () => {
  let projectId: string

  beforeEach(async () => {
    // Créer un projet de test
    const project = await prisma.project.create({
      data: {
        title: 'Test Project',
        description: 'Test Description',
        imageUrl: 'https://example.com/image.jpg',
        order: 1,
      },
    })
    projectId = project.id
  })

  afterEach(async () => {
    // Nettoyer la base de données
    await prisma.project.deleteMany()
    await prisma.technology.deleteMany()
  })

  it('should list all projects', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('title', 'Test Project')
  })

  it('should create a new project', async () => {
    const request = new Request('http://localhost:3000/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        title: 'New Project',
        description: 'New Description',
        imageUrl: 'https://example.com/new.jpg',
        order: 2,
        technologies: [],
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('title', 'New Project')
  })

  it('should update a project', async () => {
    const request = new Request(`http://localhost:3000/api/projects/${projectId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: 'Updated Project',
        description: 'Updated Description',
        imageUrl: 'https://example.com/updated.jpg',
        order: 3,
        technologies: [],
      }),
    })

    const response = await PATCH(request, { params: { id: projectId } })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('title', 'Updated Project')
  })

  it('should delete a project', async () => {
    const request = new Request(`http://localhost:3000/api/projects/${projectId}`, {
      method: 'DELETE',
    })

    const response = await DELETE(request, { params: { id: projectId } })

    expect(response.status).toBe(204)

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })
    expect(project).toBeNull()
  })
}) 