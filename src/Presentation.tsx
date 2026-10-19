import { Deck, Slide } from '@revealjs/react';
import RevealNotes from 'reveal.js/plugin/notes';
import type { RevealApi } from 'reveal.js';
import { useRef } from 'react';
import "reveal.js/reveal.css";
import 'reveal.js/theme/white.css';
import './styles.css';

import Title from './Title';
import Text from './Text';
import Block from './Block';
import Figure from './Figure';
import Cite from './Cite';
import SpeakerNotes from './SpeakerNotes';
import { references } from './references';

import logoImg from '../imgs/logo.png';
import waveImg from '../imgs/output.png';
import reflectionImg from '../imgs/reflection.png';
import refractionImg from '../imgs/refraction.png';
import diffractionImg from '../imgs/diffraction.png';
import rirImg from '../imgs/rir.png';
import imageSourceImg from '../imgs/image-source.png';
import raytracingIllImg from '../imgs/raytracing-ill.png';
import beamTracingImg from '../imgs/beam-tracing.png';
import receiverSizeImg from '../imgs/receiver_size.png';
import receiverProximityImg from '../imgs/receiver_proximity.png';
import ambisonicsImg from '../imgs/ambisonics.png';
import perspectiveImg from '../imgs/perp.png';
import equirectImg from '../imgs/equi.png';
import raytracingResultImg from '../imgs/raytracing.png';
import scr10mImg from '../imgs/scr_10m.png';
import scr20mImg from '../imgs/scr_20m.png';
import scrEllipseImg from '../imgs/scr_ellipse.png';
import scrRoomImg from '../imgs/scr_room.png';
import spl10mImg from '../imgs/10m.png';
import spl20mImg from '../imgs/20m.png';
import splEllipseImg from '../imgs/ellipse.png';
import splRoomImg from '../imgs/room.png';

import algorithmsGraph from '../graphs/algorithms.png';
import pipelineGraph from '../graphs/pipeline.png';
import textureGraph from '../graphs/texture.png';
import lrTreeGraph from '../graphs/lrtree.png';
import auralizationGraph from '../graphs/auralization.png';
import webglGraph from '../graphs/webgl.png';
import webAudioGraph from '../graphs/webaudio.png';
import convolutionGraph from '../graphs/convolution.png';
import performanceGraph from '../graphs/performance.png';
import mdGraph from '../graphs/md.png';

type PerfRow = {
    room: string;
    desktop: number;
    phone: number;
    isimpa: number;
    md: string;
};

const perf8192: PerfRow[] = [
    { room: 'Cube 1000 m³', desktop: 39, phone: 376, isimpa: 2880, md: '+6.3' },
    { room: 'Cube 8000 m³', desktop: 53, phone: 430, isimpa: 2809, md: '+8.3' },
    { room: 'Elliptical', desktop: 81, phone: 771, isimpa: 3408, md: '-4.6' },
    { room: 'L-shaped', desktop: 58, phone: 384, isimpa: 2854, md: '-2.2' },
];

const perf131072: PerfRow[] = [
    { room: 'Cube 1000 m³', desktop: 180, phone: 3867, isimpa: 3451, md: '+2.9' },
    { room: 'Cube 8000 m³', desktop: 867, phone: 4784, isimpa: 3662, md: '+6.5' },
    { room: 'Elliptical', desktop: 932, phone: 5524, isimpa: 19695, md: '-3.3' },
    { room: 'L-shaped', desktop: 892, phone: 4269, isimpa: 3228, md: '-0.8' },
];

type AccuracyRoom = {
    name: string;
    description: string;
    scene: string;
    spl: string;
    notes: string;
};

const accuracyRooms: AccuracyRoom[] = [
    {
        name: 'Cube 1000 m³', description: '10 m per side', scene: scr10mImg, spl: spl10mImg,
        notes: 'Simplest case: a 10 m cube. The decay slope is very close to I-Simpa; the mean difference at 8192 rays is +6.3 dB.',
    },
    {
        name: 'Cube 8000 m³', description: '20 m per side', scene: scr20mImg, spl: spl20mImg,
        notes: 'Same shape, eight times the volume. This room shows the largest difference (+8.3 dB at 8192 rays), but the shape of the decay still matches.',
    },
    {
        name: 'Elliptical Room', description: '2 m × 4 m × 8 m', scene: scrEllipseImg, spl: splEllipseImg,
        notes: 'Curved walls: a good test that the ray-triangle intersections and reflections work on a non-box geometry. Here we are slightly below I-Simpa (-4.6 dB).',
    },
    {
        name: 'L-shaped Room', description: 'source and receiver on either side of the corner', scene: scrRoomImg, spl: splRoomImg,
        notes: 'No direct path between source and receiver, so all energy arrives through reflections. This is the closest match: -2.2 dB at 8192 rays.',
    },
];

const REFS_PER_SLIDE = 10;

const sections = [
    'Introduction',
    'Fundamentals of Sound and Impulse Responses',
    'Sound Propagation Algorithms',
    'DRIR, HRTF and Ambisonics',
    'Implementation',
    'Testing',
    'Sources',
];

function PerfTable({ rows }: { rows: PerfRow[] }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Room</th>
                    <th>Ours: Desktop (ms)</th>
                    <th>Ours: Smartphone (ms)</th>
                    <th>I-Simpa: Desktop (ms)</th>
                    <th>MD (dB)</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((r) => (
                    <tr key={r.room}>
                        <td>{r.room}</td>
                        <td>{r.desktop}</td>
                        <td>{r.phone}</td>
                        <td>{r.isimpa}</td>
                        <td>{r.md}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function SectionSlide({ index }: { index: number }) {
    return (
        <Slide className="section-slide">
            <p className="section-number">{index + 1}</p>
            <h2>{sections[index]}</h2>
        </Slide>
    );
}

function Presentation() {
    const deckRef = useRef<RevealApi | null>(null);
    const refPages = Array.from(
        { length: Math.ceil(references.length / REFS_PER_SLIDE) },
        (_, i) => references.slice(i * REFS_PER_SLIDE, (i + 1) * REFS_PER_SLIDE),
    );
    return (
        <Deck deckRef={deckRef} plugins={[RevealNotes]} config={{ slideNumber: 'c/t', hash: true }}>
            {/* ---------- Title ---------- */}
            <Slide className="title-slide">
                <img src={logoImg} className="logo" />
                <h2>A Novel Methodology for Sound Spatialisation and VR Acoustics in the Web</h2>
                <p className="subtitle">Master's Thesis Presentation</p>
                <hr />
                <p className="author">George Daskalakis</p>
                <p>Supervisor: Prof. Athanasios Malamos</p>
                <p className="affiliation">
                    Department of Electrical and Computer Engineering<br />
                    Hellenic Mediterranean University · 2026
                </p>
            </Slide>

            {/* ---------- Contents ---------- */}
            <Slide>
                <Title>Contents</Title>
                <ol>
                    {sections.map((s) => <li key={s}>{s}</li>)}
                </ol>
            </Slide>

            {/* ================= 1. Introduction ================= */}
            <SectionSlide index={0} />

            <Slide>
                <Title>Our Goal</Title>
                <ul>
                    <li className='fragment'>
                        Implement a novel Web3D implementation that generates <b>Directional Room Impulse Responses (DRIR)</b> for
                        virtual spaces, based on their volume, topology and materials and on the source and receiver positions,
                        simulating specular and diffuse reflections and reverberation with <b>ray tracing</b>.
                    </li>
                    <li className='fragment'>
                        <b>WebGL</b> provides GPU acceleration for the ray tracing algorithm
                        and the <b>Web Audio API</b> is used for auralization.
                    </li>
                    <li className='fragment'>
                        Both are available in every browser, so the implementation is platform independent
                        and fast enough even for low-end devices such as smartphones for simple scenes.
                    </li>
                </ul>
                <SpeakerNotes>
                    This is the one-sentence summary of the thesis. Everything that follows explains either the
                    acoustics behind it (sections 2 to 4), how we built it (section 5) or how well it works (section 6).
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Motivation</Title>
                <ul>
                    <li className="fragment">Immersive experiences (VR, AR, games) need sound that agrees with what the user sees<Cite k="blauert1997spatial" /></li>
                    <li className="fragment">Also used in architecture: designing airports, theaters and stations without unwanted echoes<Cite k={['buildings4020113', 'naylor1993odeon']} /></li>
                    <li className="fragment">Many techniques exist for physically accurate simulation<Cite k={['funkhouser2003survey', 'lakka2018spatial']} />, but their use on the web is limited</li>
                </ul>
                <SpeakerNotes>
                    The goal of spatial audio is presence: if I see a cathedral, it should also sound like a cathedral.
                    To get there we need to simulate how sound travels through a room, which is what room acoustics does.
                    The result of that simulation, the RIR, is also useful on its own, for example to architects.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>The Problem</Title>
                <ul>
                    <li className="fragment">Accurate simulation is computationally expensive. Tools like Odeon<Cite k="naylor1993odeon" /> are built for offline use</li>
                    <li className="fragment">Real-time web apps fall back to basic panning, volume attenuation or pre-recorded samples</li>
                    <li className="fragment">The Web Audio API lacks the methods needed for proper room acoustics auralization.</li>
                    <li className="fragment">The web targets everything from desktops to smartphones, where efficiency and battery life matter</li>
                </ul>
                <SpeakerNotes>
                    Three constraints: the algorithms are heavy, the browser has no built-in room acoustics,
                    and whatever we build must also run on a phone. That is why web audio today is mostly simple panning.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Technology: WebGL</Title>
                <Block>
                    A JavaScript API for GPU-accelerated graphics in the browser, built for <b>rasterization</b>:
                    vertices are projected by the <i>vertex shader</i> and every pixel is colored by the <i>fragment shader</i>.
                </Block>
                <Figure src={webglGraph} height="260px" />
                <Block asFrag>
                    We use it for general-purpose computation instead: every pixel of the output is one sound ray,
                    traced in parallel on the GPU<Cite k="lesar2018real" />.
                </Block>
                <SpeakerNotes>
                    WebGL is the only way to reach the GPU that works in practically every browser, including mobile.
                    It has no compute shaders, so we "trick" it: we draw a single rectangle covering the screen and
                    run the ray tracer inside the fragment shader. The image it produces is not meant to be seen,
                    it is our data. Details in the implementation section.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Technology: Web Audio API</Title>
                <Block>
                    A browser API for processing and synthesizing audio as a graph of <b>audio nodes</b>{' '}
                    (sources, filters, convolvers, panners) connected to an output.
                </Block>
                <Figure src={webAudioGraph} height="120px" />
                <ul>
                    <li className="fragment"><b>ConvolverNode</b>: applies an impulse response to a sound (auralization)</li>
                    <li className="fragment"><b>OfflineAudioContext</b>: renders a graph to a buffer as fast as possible, without playing it</li>
                    <li className="fragment">On its own it offers only simple panning, no room acoustics</li>
                </ul>
                <SpeakerNotes>
                    The Web Audio API does the "listening" part. We use the offline context to build the final
                    impulse response, and a normal context with a ConvolverNode to play a sound through it.
                </SpeakerNotes>
            </Slide>

            {/* ================= 2. Fundamentals of Sound and IR ================= */}
            <SectionSlide index={1} />

            <Slide>
                <Title>Properties of Sound</Title>
                <div className="cols">
                    <Figure src={waveImg} caption="Wavelength, phase and amplitude" />
                    <div style={{ textAlign: 'left' }}>
                        <Text asFrag><b>Frequency:</b> oscillations per second (Hz). Audible range is 20 to 20,000 Hz</Text>
                        <Text asFrag><b>Speed:</b> depends on the medium, 343 m/s in dry room-temperature air</Text>
                        <Text asFrag><b>Amplitude:</b> intensity, measured in dB</Text>
                        <Text asFrag><b>Phase:</b> position of the wave relative to a fixed point</Text>
                        <Text asFrag><b>Wavelength:</b> distance between two points of the same phase</Text>
                    </div>
                </div>
                <SpeakerNotes>
                    Sound is a wave travelling through a medium. The two numbers we use most later are the speed,
                    343 m/s, which converts ray length into arrival time, and the frequency, because
                    materials absorb different frequencies differently.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Sound Phenomena in a Room</Title>
                <div className="cols" style={{ alignItems: 'flex-start' }}>
                    <div className="fragment">
                        <Figure src={reflectionImg} caption="(a) specular, (b) diffuse" />
                        <Text><b>Reflection:</b> specular when the surface is smooth relative to the wavelength, diffuse when irregularities are comparable to it</Text>
                    </div>
                    <div className="fragment">
                        <Figure src={refractionImg} height="150px" />
                        <Text><b>Refraction:</b> a wave crossing a boundary between two media at an oblique angle follows the fastest path</Text>
                    </div>
                    <div className="fragment">
                        <Figure src={diffractionImg} caption="(a) small opening, (b) corner" />
                        <Text><b>Diffraction:</b> sound bending around corners or through small openings, strongest at low frequencies</Text>
                    </div>
                </div>
                <br />
                <Block asFrag>
                    <b>Absorption:</b> energy lost to the air and to materials, expressed as frequency-dependent coefficients between 0 and 1
                </Block>
                <SpeakerNotes>
                    These phenomena are why a furnished room sounds different from a stone cathedral.
                    Our simulation models specular and diffuse reflection and frequency-dependent absorption.
                    Diffraction is a wave effect that geometric methods like ours ignore; we come back to that.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Room Impulse Response (RIR)</Title>
                <Block>A RIR describes how a receiver R perceives sound emitted by a source S</Block>
                <div className="cols">
                    <Figure src={rirImg} height="300px" />
                    <div style={{ textAlign: 'left' }}>
                        <ol style={{ fontSize: '0.6em' }}>
                            <li className="fragment"><b>Direct path:</b> straight from S to R</li>
                            <li className="fragment"><b>Early echoes:</b> first, mostly specular reflections</li>
                            <li className="fragment"><b>Late reverberation:</b> mostly diffuse reflections from all directions, perceived as a low hum</li>
                        </ol>
                        <Block asFrag>
                            Real RIRs are measured by exciting the room with Dirac impulses covering 20 Hz to 20 kHz<Cite k="klein2020directional" />
                        </Block>
                    </div>
                </div>
                <SpeakerNotes>
                    Think of the RIR as the sound signature of a room for one source and one listener position.
                    If you clap once in a room and record it, what you hear is roughly the RIR.
                    Every sound propagation algorithm in the next section is a way of computing this curve.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Auralization</Title>
                <Block>
                    Rendering a sound as the receiver would hear it in the room<Cite k="schroeder1962computers" />:
                    an anechoic recording is <b>convolved</b> with the RIR<Cite k="forster2008auralization" />.
                </Block>
                <Figure src={convolutionGraph} height="190px" />
                <ul>
                    <li className="fragment">An anechoic recording is made in a reflection-free room, so it carries no room of its own</li>
                    <li className="fragment">Convolution "smears" the dry sound with every reflection in the RIR</li>
                    <li className="fragment">The result sounds as if it was played in the room the RIR came from</li>
                </ul>
                <SpeakerNotes>
                    This is how we go from a simulation result to something you can hear.
                    The same RIR can be applied to any sound: speech, music, footsteps.
                    In the browser this is exactly what the ConvolverNode does.
                </SpeakerNotes>
            </Slide>

            {/* ================= 3. Sound Propagation Algorithms ================= */}
            <SectionSlide index={2} />

            <Slide>
                <Title>Sound Propagation Algorithms</Title>
                <Figure src={algorithmsGraph} height="380px" />
                <Block asFrag>
                    Sound propagation refers to a family of algorithms that calculate how sound
                    travels and interacts with a space. They are divided into two groups. Wave-based and Geometric.
                </Block>
                <SpeakerNotes>
                    Two families: wave equation methods solve the physics directly, geometric methods treat sound
                    like light rays. I will go through both briefly and explain why we picked ray tracing.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Wave Equation Methods</Title>
                <Block>Numerically solve the acoustic wave equation, the most accurate approach<Cite k="lakka2018spatial" /></Block>
                <div className="cols" style={{ margin: '0.4em 0' }}>
                    <div className="eq">∂²p / ∂t² = c² ∇²p</div>
                    <div className="eq">∇²P + (ω² / c²) P = 0</div>
                </div>
                <ul>
                    <li className="fragment"><b>Finite Element:</b> handles complex geometry and boundaries<Cite k="acoustics5020022" />, but a 3 s IR of an auditorium took 9000 s on 512 CPU cores<Cite k="buildings12020105" /></li>
                    <li className="fragment"><b>Boundary Element:</b> discretizes only surfaces<Cite k="aliabadi2002boundary" />, but suits open spaces better than complex enclosed rooms</li>
                    <li className="fragment"><b>FDTD:</b> GPU-friendly, 12× over CPUs<Cite k="4438007" />, yet real-time only for low frequencies<Cite k="savioja2010real" /> and it must share the GPU with graphics</li>
                </ul>
                <SpeakerNotes>
                    Left: the wave equation in the time domain. Right: the Helmholtz equation, its frequency-domain form.
                    These methods capture every wave effect, including diffraction, but the cost is enormous.
                    The FE example is the key number: 9000 seconds on 512 cores for a 3 second response.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Geometric Methods</Title>
                <Block>Model sound as rays or particles: much faster, used by state-of-the-art software<Cite k={['naylor1993odeon', 'savioja2015overview']} />, but ignore some wave effects</Block>
                <div className="cols" style={{ alignItems: 'flex-start', marginTop: '0.5em' }}>
                    <div className="fragment">
                        <Figure src={imageSourceImg} height="170px" />
                        <Text><b>Image-Source:</b> mirrors the source on every surface. Exact specular reflections only, no reverberation<Cite k="vorlander2020fundamentals" /></Text>
                    </div>
                    <div className="fragment">
                        <Figure src={raytracingIllImg} height="170px" />
                        <Text><b>Ray-Tracing:</b> stochastic, follows many random rays. Handles specular and diffuse reflections<Cite k="KROKSTAD1968118" /></Text>
                    </div>
                    <div className="fragment">
                        <Figure src={beamTracingImg} height="170px" />
                        <Text><b>Beam-Tracing:</b> pyramidal beams. Hard to adapt to arbitrary or dynamic rooms<Cite k="funkhouser2003survey" /></Text>
                    </div>
                </div>
                <SpeakerNotes>
                    Same idea as light simulation. Sound wavelengths are long, so small details in the geometry
                    barely matter and a crude mesh is enough. The price is that low-frequency wave effects are lost.
                    Image-source is exact but only for specular reflections and explodes with room complexity.
                    Beam tracing is precise but hard to implement for arbitrary rooms.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Why Ray-Tracing?</Title>
                <ul>
                    <li className="fragment">Simulates both specular and diffuse reflections, so it captures reverberation</li>
                    <li className="fragment">Accuracy grows with the number of rays and diffuse samples</li>
                    <li className="fragment">Thousands of independent rays make it ideal for <b>GPU parallelism</b><Cite k="taylor2012guided" /></li>
                    <li className="fragment">Sound wavelengths are long, so a crude mesh loses little accuracy<Cite k="lakka2018spatial" /></li>
                    <li className="fragment">Trade-off: the result is stochastic, never exact</li>
                </ul>
                <SpeakerNotes>
                    The deciding point is parallelism: every ray is independent, which maps perfectly onto
                    one pixel per ray in WebGL. And the number of rays is a quality knob we can turn down on a phone.
                </SpeakerNotes>
            </Slide>

            {/* ================= 4. DRIR, HRTF, Ambisonics ================= */}
            <SectionSlide index={3} />

            <Slide>
                <Title>Directional RIR (DRIR)</Title>
                <ul>
                    <li className="fragment">
                        A plain RIR tells us <i>when</i> and <i>how loud</i> each reflection arrives, but not <i>from where</i>.
                    </li>
                    <li className="fragment">
                        A <b>Directional RIR (DRIR)</b> also stores the <i>direction</i> from which each part of the sound arrives,
                        which is essential for VR and 3D audio.
                    </li>
                    <li className="fragment">
                        Real DRIRs are captured with spherical microphone arrays
                        and stored as ambisonic files<Cite k="perez2018ambisonics" />.
                    </li>
                </ul>
                <SpeakerNotes>
                    For VR, knowing that a reflection arrives 20 ms later is not enough; we need to know it came
                    from the wall on the left, so that turning your head changes what you hear.
                    Our simulation produces a DRIR, and we store it the same way real recordings do: as ambisonics.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>HRTF and Binaural Rendering</Title>
                <ul>
                    <li className="fragment">We localize sound through <b>ITD</b> (Interaural time difference), <b>ILD</b> (Interaural level difference) and pinna filtering<Cite k="begault2010applying" /></li>
                    <li className="fragment">The <b>HRTF/HRIR</b> captures how head, ears and torso filter sound from each direction<Cite k="zotkin2003hrtf" /></li>
                    <li className="fragment">DRIR ⊛ HRIR gives a 2-channel <b>Binaural RIR (BRIR)</b>, played over headphones</li>
                </ul>
                <div className="fragment">
                    <Figure src={auralizationGraph} height="230px" />
                </div>
                <SpeakerNotes>
                    Our brain uses tiny differences between the two ears to locate sounds: arrival time, level,
                    and the filtering of the outer ear, which is what gives us elevation.
                    The HRIR is a measurement of exactly that filtering. Combining it with the DRIR gives one
                    impulse response per ear, so headphones can reproduce a 3D scene.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Ambisonics</Title>
                <Figure src={ambisonicsImg} height="200px" caption="Spherical harmonics of the first ambisonic orders" />
                <ul>
                    <li className="fragment">Encodes a full 360° sound field around the listener using spherical harmonics<Cite k={['furness1990ambisonics', 'frank2015producing']} /></li>
                    <li className="fragment">The <b>ambisonic order</b> trades detail for cost, so quality can be scaled to the device</li>
                    <li className="fragment">An open standard with open-source implementations<Cite k="furse2009building" /></li>
                    <li className="fragment">We use <b>first order</b>: 4 channels (W, X, Y, Z)</li>
                </ul>
                <SpeakerNotes>
                    Ambisonics describes the sound field around one point, not a set of speaker positions,
                    which makes it a natural container for a DRIR. Each order adds channels and spatial detail.
                    First order means one omnidirectional channel plus one per axis.
                </SpeakerNotes>
            </Slide>

            {/* ================= 5. Implementation ================= */}
            <SectionSlide index={4} />

            <Slide>
                <Title>Implementation Pipeline</Title>
                <Figure src={pipelineGraph} height="580px" />
                <SpeakerNotes>
                    Three stages: upload the scene to the GPU, ray trace in a WebGL fragment shader,
                    and turn the result into audio with the Web Audio API. The next slides follow this diagram.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Scene Data on the GPU</Title>
                <div className="cols">
                    <ul style={{ fontSize: '0.7em' }}>
                        <li className="fragment">The fragment shader normally cannot see the whole mesh</li>
                        <li className="fragment">Store the mesh in a <b>32-bit float RGBA texture</b><Cite k="lesar2018real" /></li>
                        <li className="fragment">Draw two triangles covering the viewport, so every fragment can read all mesh data</li>
                        <li className="fragment">Uniforms carry the reflection order and the source and receiver positions</li>
                    </ul>
                </div>
                <SpeakerNotes>
                    Ray tracing needs every triangle available to every ray. Textures are the one large,
                    randomly accessible buffer WebGL gives us, so each triangle becomes one row of float texels
                    holding positions, normals and the material.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Ray-Tracing in the Fragment Shader</Title>
                <div className="cols">
                    <Figure src={perspectiveImg} height="240px" caption="Perspective: the back of the scene is invisible" />
                    <Figure src={equirectImg} height="240px" caption="Equirectangular: all directions at once" />
                </div>
                <ul>
                    <li className="fragment">Output resolution = number of rays: <b>each pixel is one ray</b></li>
                    <li className="fragment"><b>Equirectangular projection</b> maps pixels to azimuth and elevation around the receiver</li>
                    <li className="fragment">Rays start at the <b>receiver</b>, so the arrival direction is known<Cite k="ouellet2021live" /></li>
                </ul>
                <SpeakerNotes>
                    A normal camera only sees what is in front of it. We need all directions, so we use the
                    equirectangular projection, the same one used for 360° photos.
                    We also reverse the usual direction: rays start at the listener and look for the source,
                    which tells us directly which direction each contribution arrives from.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Ray-Tracing Result</Title>
                <Figure
                    src={raytracingResultImg}
                    height="260px"
                    caption="(a) Equirectangular output, red = energy, green = distance. The large circle is the source, the smaller ones its reflections. (b) The same result mapped onto the receiver sphere"
                />
                <ul style={{ fontSize: '0.65em' }}>
                    <li className="fragment">Rays bounce with specular and diffuse reflections, with multiple samples per diffuse reflection</li>
                    <li className="fragment">A ray ends at the maximum reflection order or when it hits the source, storing its <b>energy</b> and <b>distance</b></li>
                    <li className="fragment">The simulation runs for <b>8 frequency bands</b> (125 Hz to 16 kHz); two rays per pixel (RG, BA) give <b>4 output textures</b></li>
                </ul>
                <SpeakerNotes>
                    This is what the shader actually outputs. The bright spot in the middle is the direct sound,
                    the smaller spots are reflections off the walls. Because absorption depends on frequency,
                    we run this once per octave band, eight bands in total.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Ambisonic Encoding</Title>
                <Block>Each ray hit becomes an impulse at t = distance / 343 m/s, encoded per band into first-order ambisonics:</Block>
                <div className="eq" style={{ lineHeight: 1.6, margin: '0.6em 0' }}>
                    Ch<sub>0</sub> = 1<br />
                    Ch<sub>1</sub> = sin(θ) · cos(φ)<br />
                    Ch<sub>2</sub> = sin(φ)<br />
                    Ch<sub>3</sub> = cos(θ) · cos(φ)
                </div>
                <Block asFrag>θ = azimuth, φ = elevation, both recovered from the pixel position via the equirectangular projection</Block>
                <SpeakerNotes>
                    We read the textures back on the CPU. Distance gives the time of the impulse, energy its
                    amplitude, and the pixel position gives the direction. These four gains place the impulse
                    in the four ambisonic channels.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Merging the Bands and Auralization</Title>
                <Figure src={lrTreeGraph} height="290px" />
                <ul style={{ fontSize: '0.65em' }}>
                    <li className="fragment">The 8 band DRIRs pass through a <b>Linkwitz-Riley crossover filter tree</b><Cite k="ouellet2021live" />, with crossovers at the geometric mean of neighbouring bands</li>
                    <li className="fragment">The full-band ambisonic DRIR is convolved with an HRIR in an <b>OfflineAudioContext</b> to get the <b>BRIR</b></li>
                    <li className="fragment">The BRIR is convolved with the anechoic sound in a second Web Audio context</li>
                </ul>
                <SpeakerNotes>
                    Each band DRIR only contains the energy for its frequency range, so the crossover tree
                    filters and sums them pairwise into one full-band response. Linkwitz-Riley filters sum flat,
                    so the merge does not color the sound. After that it is the HRIR and anechoic convolution
                    we saw in section 4.
                </SpeakerNotes>
            </Slide>

            {/* ================= 6. Testing ================= */}
            <SectionSlide index={5} />

            <Slide>
                <Title>Evaluation Setup</Title>
                <Block>
                    We compare against <b>I-Simpa</b><Cite k="picaut2012simpa" /> (SPPS algorithm<Cite k="picaut2012spps" />) using
                    the Sound Pressure Level (SPL) over time, with 8192 rays in both systems.
                </Block>
                <ul>
                    <li className="fragment">Four rooms: 1000 m³ cube, 8000 m³ cube, elliptical (2 × 4 × 8 m), L-shaped</li>
                    <li className="fragment">Boundary absorption coefficient 0.2 in all rooms</li>
                    <li className="fragment">Desktop: Radeon RX 7800 XT, AMD 5600, 32 GB RAM</li>
                    <li className="fragment">Smartphone: MediaTek Helio G99, 8 GB RAM</li>
                    <li className="fragment">I-Simpa is a native Windows app, so it ran on the desktop only</li>
                </ul>
                <SpeakerNotes>
                    I-Simpa is an established open-source room acoustics tool, which makes it a fair reference.
                    SPL over time shows both the level and the decay of the response.
                    The phone is a mid-range device, deliberately not a flagship.
                </SpeakerNotes>
            </Slide>

            {accuracyRooms.map((room) => (
                <Slide key={room.name}>
                    <Title>{`Accuracy: ${room.name}`}</Title>
                    <Text>{room.description}</Text>
                    <div className="cols">
                        <Figure src={room.scene} height="300px" caption="Room in I-Simpa" />
                        <Figure src={room.spl} height="400px" caption="SPL (dB): ours vs I-Simpa" />
                    </div>
                    <SpeakerNotes>{room.notes}</SpeakerNotes>
                </Slide>
            ))}

            <Slide>
                <Title>Accuracy</Title>
                <ul>
                    <li className="fragment">SPL curves follow a similar shape to I-Simpa in all four rooms</li>
                    <li className="fragment">Reverberation time (time to drop below -60 dB) is similar in most cases</li>
                    <li className="fragment">Remaining differences are attributed to the stochastic ray generation in both tools</li>
                    <li className="fragment">The mean difference shrinks as the number of rays grows</li>
                </ul>
                <SpeakerNotes>
                    Both tools are stochastic, so we do not expect identical curves. What matters is that the
                    decay and the reverberation time agree. The next slides show that the gap closes with more rays.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Performance vs Number of Rays</Title>
                <Figure src={performanceGraph} height="300px" caption="Computation time (log scale) for 2048, 8192 and 131072 rays" />
                <Block asFrag>
                    Up to 8192 rays our desktop timings are 1 to 2 orders of magnitude below I-Simpa,
                    and the smartphone stays below one second.
                </Block>
                <SpeakerNotes>
                    Note the log scale. Blue is our desktop, orange our smartphone, green I-Simpa on the desktop.
                    I-Simpa has a high fixed cost and grows slowly; ours starts tiny and grows with the ray count.
                    At 131072 rays the phone reaches roughly the same time as I-Simpa on the desktop.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Performance: 8192 Rays</Title>
                <PerfTable rows={perf8192} />
                <br />
                <Block asFrag>
                    On desktop we are roughly 40 to 75 times faster than I-Simpa, and a mid-range smartphone still finishes in under a second.
                </Block>
                <SpeakerNotes>
                    8192 rays is the setting used for the accuracy plots. MD is the mean SPL difference to I-Simpa.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Performance: 131072 Rays</Title>
                <PerfTable rows={perf131072} />
                <br />
                <Block asFrag>
                    With 16 times more rays the absolute mean difference drops to between 0.8 and 6.5 dB.
                    The desktop remains 4 to 21 times faster than I-Simpa, and the smartphone is in the same range as I-Simpa on the desktop.
                </Block>
                <SpeakerNotes>
                    The elliptical room is the outlier for I-Simpa at almost 20 seconds; ours stays under one second on desktop.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Accuracy vs Number of Rays</Title>
                <Figure src={mdGraph} height="400px" caption="Absolute mean SPL difference to I-Simpa" />
                <SpeakerNotes>
                    In every room the difference to I-Simpa drops as we add rays, which is what we expect from
                    a stochastic method converging. The large cube keeps the largest gap; a likely reason is that in a bigger room a
                    smaller share of the rays reaches the receiver, so more rays are needed.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Conclusion and Future Work</Title>
                <ul>
                    <li className="fragment">A real-time, ray-tracing based sound propagation simulation that runs directly in the browser</li>
                    <li className="fragment"><b>WebGL</b> provides the parallelism, the <b>Web Audio API</b> provides auralization</li>
                    <li className="fragment">Accuracy on par with I-Simpa, with no installation or setup, even on a low-end smartphone</li>
                    <li className="fragment"><b>Future:</b> integrate with 3D graphics standards such as <b>X3D</b>, giving web developers an easy way to build immersive audio-visual experiences</li>
                </ul>
                <SpeakerNotes>
                    Summary: ray tracing is usually considered too heavy for the web, but with the GPU through WebGL
                    it runs in real time, even on a phone, with accuracy comparable to a desktop tool.
                </SpeakerNotes>
            </Slide>

            <Slide>
                <Title>Thank you</Title>
                <Text>Questions?</Text>
            </Slide>

            {/* ================= 7. Sources ================= */}
            <SectionSlide index={6} />

            {refPages.map((page, i) => (
                <Slide key={`refs-${i}`}>
                    <Title>{refPages.length > 1 ? `Sources (${i + 1}/${refPages.length})` : 'Sources'}</Title>
                    <ol className="refs" start={i * REFS_PER_SLIDE + 1}>
                        {page.map((r) => <li key={r.key}>{r.text}</li>)}
                    </ol>
                </Slide>
            ))}
        </Deck>
    )
}

export default Presentation
